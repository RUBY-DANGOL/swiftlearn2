'use server';

/**
 * @fileOverview An AI flow for a chatbot that answers questions based on a given context.
 *
 * - contextualChatbot - A function that answers questions using provided text context.
 * - ContextualChatbotInput - The input type for the contextualChatbot function.
 * - ContextualChatbotOutput - The return type for the contextualChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContextualChatbotInputSchema = z.object({
  context: z.string().describe('The text context the chatbot should use to answer the question.'),
  question: z.string().describe('The question to ask about the context.'),
});
export type ContextualChatbotInput = z.infer<typeof ContextualChatbotInputSchema>;

const ContextualChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the question, based only on the provided context.'),
});
export type ContextualChatbotOutput = z.infer<typeof ContextualChatbotOutputSchema>;

export async function contextualChatbot(input: ContextualChatbotInput): Promise<ContextualChatbotOutput> {
  return contextualChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contextualChatbotPrompt',
  input: {schema: ContextualChatbotInputSchema},
  output: {schema: ContextualChatbotOutputSchema},
  prompt: `You are an expert tutor. Your role is to answer the user's question based *only* on the provided context below.

Do not use any external knowledge. If the answer cannot be found in the context, you must explicitly state that the answer is not available in the provided notes.

Context:
---
{{{context}}}
---

Question:
{{{question}}}
`,
});

const contextualChatbotFlow = ai.defineFlow(
  {
    name: 'contextualChatbotFlow',
    inputSchema: ContextualChatbotInputSchema,
    outputSchema: ContextualChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
