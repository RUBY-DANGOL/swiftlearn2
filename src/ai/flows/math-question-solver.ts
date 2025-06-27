'use server';

/**
 * @fileOverview An AI flow to solve math problems from an uploaded image or PDF.
 *
 * - solveMathProblem - A function that solves a math problem from a media file.
 * - SolveMathProblemInput - The input type for the solveMathProblem function.
 * - SolveMathProblemOutput - The return type for the solveMathProblem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SolveMathProblemInputSchema = z.object({
  mediaDataUri: z
    .string()
    .describe(
      "An image or PDF of a math problem, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SolveMathProblemInput = z.infer<typeof SolveMathProblemInputSchema>;

const SolveMathProblemOutputSchema = z.object({
  solution: z.string().describe('The step-by-step solution to the math problem, formatted in Markdown.'),
  topic: z.string().describe('The core mathematical topic or concept identified in the problem (e.g., "Quadratic Equations", "Integration by Parts").'),
});
export type SolveMathProblemOutput = z.infer<typeof SolveMathProblemOutputSchema>;

export async function solveMathProblem(input: SolveMathProblemInput): Promise<SolveMathProblemOutput> {
  return solveMathProblemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'solveMathProblemPrompt',
  input: {schema: SolveMathProblemInputSchema},
  output: {schema: SolveMathProblemOutputSchema},
  prompt: `You are an expert math tutor. Your task is to analyze the math problem presented in the provided image or document.

1.  **Identify the Topic:** First, identify the primary mathematical topic or concept this problem is about (e.g., "Quadratic Equations", "Integration by Parts", "Newton's Laws of Motion").
2.  **Solve the Problem:** Provide a detailed, step-by-step solution. Explain the reasoning behind each step clearly. Format your final answer using Markdown, including LaTeX for mathematical expressions (e.g., use $...$ for inline math and $$...$$ for block math).

Return the topic and the solution in the specified format.

Problem:
{{media url=mediaDataUri}}`,
});

const solveMathProblemFlow = ai.defineFlow(
  {
    name: 'solveMathProblemFlow',
    inputSchema: SolveMathProblemInputSchema,
    outputSchema: SolveMathProblemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
