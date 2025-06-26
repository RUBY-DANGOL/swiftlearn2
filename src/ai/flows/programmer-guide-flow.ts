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
  language: z.string().describe('The programming language the user is working in (e.g., C++).'),
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
  prompt: `You are a helpful and friendly programming guide for a student learning to code. Your goal is to provide a simple, problem-focused hint to help them solve the challenge without giving away the answer.

**The Challenge:**
- **Title:** {{{challengeTitle}}}
- **Description:** {{{challengeDescription}}}
- **Language:** {{{language}}}

**The Student's Attempt:**
- **Code:**
\`\`\`{{{language}}}
{{{userCode}}}
\`\`\`
- **Question:** "{{{userQuestion}}}"

**Your Task:**
1.  **Analyze the Code:** Quickly identify what the student is trying to do and where they might be stuck.
2.  **Focus on the Question:** Your hint must directly address the student's specific question.
3.  **Keep it Simple:** Use clear, straightforward language. Avoid complex jargon.
4.  **Give a Hint, Not the Solution:** Point them to the next logical step or suggest a concept they might be missing. Do not write or correct code for them.
5.  **Be Encouraging:** Maintain a supportive and friendly tone.

**Example Response:**
"Great question! It looks like you're on the right track. For the 'Two Sum' problem, think about how you can check for the complement of each number. A hash map could be really useful here to store numbers you've already seen. Does that give you an idea for the next step?"

Provide a single, concise paragraph of guidance.`,
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
