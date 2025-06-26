'use server';

/**
 * @fileOverview An AI flow to act as a programming guide for coding challenges.
 *
 * - programmerGuide - A function that helps users with coding challenges.
 * - ProgrammerGuideInput - The input type for the programmerGuide function.
 * - ProgrammerGuideOutput - The return type for the programmerGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProgrammerGuideInputSchema = z.object({
  challengeTitle: z.string().describe('The title of the coding challenge.'),
  challengeDescription: z.string().describe('The detailed description of the coding challenge.'),
  language: z.string().describe('The programming language the user is working in (e.g., JavaScript, Python, C).'),
  userCode: z.string().describe("The user's current code solution."),
  userQuestion: z.string().describe('The specific question the user is asking for help with.'),
});
export type ProgrammerGuideInput = z.infer<typeof ProgrammerGuideInputSchema>;

const ProgrammerGuideOutputSchema = z.object({
  guidance: z.string().describe('A helpful, step-by-step hint or explanation to guide the user. Do not provide the complete, final code. Focus on guiding them to the solution.'),
});
export type ProgrammerGuideOutput = z.infer<typeof ProgrammerGuideOutputSchema>;

export async function programmerGuide(input: ProgrammerGuideInput): Promise<ProgrammerGuideOutput> {
  return programmerGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'programmerGuidePrompt',
  input: {schema: ProgrammerGuideInputSchema},
  output: {schema: ProgrammerGuideOutputSchema},
  prompt: `You are an expert programming tutor. Your goal is to help a student solve a coding challenge by providing hints and explanations, without giving away the complete answer.

Here is the context:
- Programming Language: {{{language}}}
- Challenge Title: {{{challengeTitle}}}
- Challenge Description: {{{challengeDescription}}}

This is the student's current code:
\`\`\`{{{language}}}
{{{userCode}}}
\`\`\`

The student's specific question is: "{{{userQuestion}}}"

Your task is to provide guidance. Think step-by-step.
1. Analyze their code for correctness and logic.
2. Understand their specific question.
3. Provide a clear, encouraging hint that points them in the right direction. Explain concepts if necessary.
4. If their code has a bug, gently point out the area to look at and explain the potential issue without fixing it for them.
5. Your guidance should be supportive and educational.

For example, if they are stuck on the 'Two Sum' problem, you could suggest: "That's a good start! Have you considered using a data structure like a hash map or a dictionary to keep track of the numbers you've already seen and their indices? That could help you find the complement for each number in a single pass."

Generate your guidance now.`,
});

const programmerGuideFlow = ai.defineFlow(
  {
    name: 'programmerGuideFlow',
    inputSchema: ProgrammerGuideInputSchema,
    outputSchema: ProgrammerGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
