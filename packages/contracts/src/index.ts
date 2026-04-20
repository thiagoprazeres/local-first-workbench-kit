import { z } from 'zod';

// Core contract schemas for workbench-kit and prompt-executor interop.

export const PromptSchema = z.object({
  id: z.string(),
  template: z.string(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});
export type Prompt = z.infer<typeof PromptSchema>;

export const StepSchema = z.object({
  id: z.string(),
  promptId: z.string(),
  input: z.record(z.string(), z.unknown()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});
export type Step = z.infer<typeof StepSchema>;

export const EvaluationSchema = z.object({
  passed: z.boolean().optional(),
  score: z.number().optional(),
  notes: z.string().optional(),
  metrics: z.record(z.string(), z.number()).optional(),
});
export type Evaluation = z.infer<typeof EvaluationSchema>;

export const StepResultSchema = z.object({
  stepId: z.string(),
  promptId: z.string(),
  output: z.unknown(),
  startedAt: z.string(),
  finishedAt: z.string(),
  durationMs: z.number(),
  metadata: z.record(z.string(), z.unknown()),
  evaluation: EvaluationSchema.optional(),
});
export type StepResult = z.infer<typeof StepResultSchema>;

export const SessionSchema = z.object({
  id: z.string(),
  startedAt: z.string(),
  finishedAt: z.string().optional(),
  steps: z.array(StepResultSchema),
  metadata: z.record(z.string(), z.unknown()),
});
export type Session = z.infer<typeof SessionSchema>;

export const SerializedSessionSchema = z.object({
  schemaVersion: z.literal(1),
  session: SessionSchema,
});
export type SerializedSession = z.infer<typeof SerializedSessionSchema>;
