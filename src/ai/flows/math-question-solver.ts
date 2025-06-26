'use server';

/**
 * @fileOverview Provides an AI-powered math question solver.
 *
 * - mathQuestionSolver - A function that accepts a math question and returns a step-by-step solution.
 * - MathQuestionSolverInput - The input type for the mathQuestionSolver function.
 * - MathQuestionSolverOutput - The return type for the mathQuestionSolver function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MathQuestionSolverInputSchema = z.object({
  question: z.string().describe('The math question to be solved.'),
});
export type MathQuestionSolverInput = z.infer<typeof MathQuestionSolverInputSchema>;

const MathQuestionSolverOutputSchema = z.object({
  solution: z.string().describe('The step-by-step solution to the math question.'),
});
export type MathQuestionSolverOutput = z.infer<typeof MathQuestionSolverOutputSchema>;

export async function mathQuestionSolver(input: MathQuestionSolverInput): Promise<MathQuestionSolverOutput> {
  return mathQuestionSolverFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mathQuestionSolverPrompt',
  input: {schema: MathQuestionSolverInputSchema},
  output: {schema: MathQuestionSolverOutputSchema},
  prompt: `You are an expert math tutor. Provide a step-by-step solution to the following math question, explaining the reasoning behind each step.

Question: {{{question}}}`,
});

const mathQuestionSolverFlow = ai.defineFlow(
  {
    name: 'mathQuestionSolverFlow',
    inputSchema: MathQuestionSolverInputSchema,
    outputSchema: MathQuestionSolverOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
