import { AdapterError, ContractViolationError } from './errors.js';
import type {
  CreateExecutorOptions,
  Executor,
  Session,
  Step,
  StepResult,
} from './types.js';
import { runValidator } from './validation.js';

export function createExecutor(options: CreateExecutorOptions): Executor {
  const { source, adapter, evaluator } = options;

  return {
    async run(step: Step, session: Session): Promise<StepResult> {
      const prompt = await source.load(step.promptId);
      const input: Readonly<Record<string, unknown>> = step.input ?? {};

      if (step.contract?.input) {
        const res = await runValidator(step.contract.input, input);
        if (!res.ok) {
          throw new ContractViolationError('input', step, res.issues ?? []);
        }
      }

      const startedAt = new Date();

      let output: unknown;
      let adapterMetadata: Readonly<Record<string, unknown>> = {};
      try {
        const adapterResult = await adapter({ prompt, input, step, session });
        output = adapterResult.output;
        if (adapterResult.metadata) adapterMetadata = adapterResult.metadata;
      } catch (error) {
        throw new AdapterError(step, error);
      }

      const finishedAt = new Date();

      if (step.contract?.output) {
        const res = await runValidator(step.contract.output, output);
        if (!res.ok) {
          throw new ContractViolationError('output', step, res.issues ?? []);
        }
        if (res.value !== undefined) output = res.value;
      }

      const baseResult: StepResult = {
        stepId: step.id,
        promptId: step.promptId,
        output,
        startedAt: startedAt.toISOString(),
        finishedAt: finishedAt.toISOString(),
        durationMs: finishedAt.getTime() - startedAt.getTime(),
        metadata: { ...(step.metadata ?? {}), ...adapterMetadata },
      };

      if (!evaluator) return baseResult;
      const evaluation = await evaluator(baseResult, step, session);
      return { ...baseResult, evaluation };
    },
  };
}
