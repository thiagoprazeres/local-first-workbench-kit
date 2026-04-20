export interface Prompt {
  readonly id: string;
  readonly template: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface PromptSource {
  load(id: string): Promise<Prompt>;
  list?(): Promise<readonly Prompt[]>;
}

export interface ValidationIssue {
  readonly path: readonly (string | number)[];
  readonly message: string;
}

export interface ValidationResult<T = unknown> {
  readonly ok: boolean;
  readonly value?: T;
  readonly issues?: readonly ValidationIssue[];
}

export type Validator<T = unknown> = (
  value: unknown,
) => ValidationResult<T> | Promise<ValidationResult<T>>;

export interface StepContract {
  readonly input?: Validator;
  readonly output?: Validator;
}

export interface Step {
  readonly id: string;
  readonly promptId: string;
  readonly input?: Readonly<Record<string, unknown>>;
  readonly contract?: StepContract;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export type Protocol = readonly Step[];

export interface Evaluation {
  readonly passed?: boolean;
  readonly score?: number;
  readonly notes?: string;
  readonly metrics?: Readonly<Record<string, number>>;
}

export interface StepResult {
  readonly stepId: string;
  readonly promptId: string;
  readonly output: unknown;
  readonly startedAt: string;
  readonly finishedAt: string;
  readonly durationMs: number;
  readonly metadata: Readonly<Record<string, unknown>>;
  readonly evaluation?: Evaluation;
}

export interface Session {
  readonly id: string;
  readonly startedAt: string;
  readonly finishedAt?: string;
  readonly steps: readonly StepResult[];
  readonly metadata: Readonly<Record<string, unknown>>;
}

export type Evaluator = (
  result: StepResult,
  step: Step,
  session: Session,
) => Evaluation | Promise<Evaluation>;

export interface AdapterInput {
  readonly prompt: Prompt;
  readonly input: Readonly<Record<string, unknown>>;
  readonly step: Step;
  readonly session: Session;
}

export interface AdapterOutput {
  readonly output: unknown;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export type ExecutorAdapter = (
  input: AdapterInput,
) => AdapterOutput | Promise<AdapterOutput>;

export interface CreateExecutorOptions {
  readonly source: PromptSource;
  readonly adapter: ExecutorAdapter;
  readonly evaluator?: Evaluator;
}

export interface Executor {
  run(step: Step, session: Session): Promise<StepResult>;
}

export interface SequenceOptions {
  readonly session?: Session;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly evaluator?: Evaluator;
  readonly onStep?: (
    result: StepResult,
    session: Session,
  ) => void | Promise<void>;
}
