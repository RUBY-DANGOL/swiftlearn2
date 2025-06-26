'use server';

/**
 * @fileOverview Summarizes YouTube videos and provides a chatbot for questions.
 *
 * - youtubeSummarization - A function to summarize YouTube videos and provide a chatbot.
 * - YoutubeSummarizationInput - The input type for the youtubeSummarization function.
 * - YoutubeSummarizationOutput - The return type for the youtubeSummarization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const YoutubeSummarizationInputSchema = z.object({
  youtubeVideoLink: z
    .string()
    .describe('The link to the YouTube video to be summarized.'),
});
export type YoutubeSummarizationInput = z.infer<typeof YoutubeSummarizationInputSchema>;

const YoutubeSummarizationOutputSchema = z.object({
  summary: z.string().describe('The summary of the YouTube video.'),
});
export type YoutubeSummarizationOutput = z.infer<typeof YoutubeSummarizationOutputSchema>;

export async function youtubeSummarization(input: YoutubeSummarizationInput): Promise<YoutubeSummarizationOutput> {
  return youtubeSummarizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'youtubeSummarizationPrompt',
  input: {schema: YoutubeSummarizationInputSchema},
  output: {schema: YoutubeSummarizationOutputSchema},
  prompt: `Summarize the content of the YouTube video from this link: {{{youtubeVideoLink}}}. Provide a concise summary.`, // Keep prompt simple; video content will be passed as tool context in chatbot.
});

const youtubeSummarizationFlow = ai.defineFlow(
  {
    name: 'youtubeSummarizationFlow',
    inputSchema: YoutubeSummarizationInputSchema,
    outputSchema: YoutubeSummarizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
