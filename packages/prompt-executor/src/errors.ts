import type { Step, ValidationIssue } from './types.js';

export class PromptExecutorError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'PromptExecutorError';
  }
}

export class PromptNotFoundError extends PromptExecutorError {
  readonly promptId: string;
  constructor(promptId: string) {
    super(`prompt-executor: prompt "${promptId}" not found`);
    this.name = 'PromptNotFoundError';
    this.promptId = promptId;
  }
}

export class ContractViolationError extends PromptExecutorError {
  readonly kind: 'input' | 'output';
  readonly stepId: string;
  readonly issues: readonly ValidationIssue[];
  constructor(
    kind: 'input' | 'output',
    step: Step,
    issues: readonly ValidationIssue[],
  ) {
    const summary = issues.map((i) => i.message).join('; ') || 'unspecified';
    super(
      `prompt-executor: ${kind} contract violated on step "${step.id}" (${summary})`,
    );
    this.name = 'ContractViolationError';
    this.kind = kind;
    this.stepId = step.id;
    this.issues = issues;
  }
}

export class AdapterError extends PromptExecutorError {
  readonly stepId: string;
  constructor(step: Step, cause: unknown) {
    super(`prompt-executor: adapter failed on step "${step.id}"`, { cause });
    this.name = 'AdapterError';
    this.stepId = step.id;
  }
}
