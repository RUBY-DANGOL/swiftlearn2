// src/ai/flows/youtube-chatbot.ts
'use server';

/**
 * @fileOverview YouTube video summarization and question answering flow.
 *
 * - youtubeChatbot - A function that accepts a YouTube video URL and a question, then answers the question based on the video content.
 * - YoutubeChatbotInput - The input type for the youtubeChatbot function.
 * - YoutubeChatbotOutput - The return type for the youtubeChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const YoutubeChatbotInputSchema = z.object({
  youtubeVideoUrl: z.string().describe('The URL of the YouTube video.'),
  question: z.string().describe('The question to ask about the video.'),
});
export type YoutubeChatbotInput = z.infer<typeof YoutubeChatbotInputSchema>;

const YoutubeChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the question based on the video content.'),
});
export type YoutubeChatbotOutput = z.infer<typeof YoutubeChatbotOutputSchema>;

export async function youtubeChatbot(input: YoutubeChatbotInput): Promise<YoutubeChatbotOutput> {
  return youtubeChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'youtubeChatbotPrompt',
  input: {schema: YoutubeChatbotInputSchema},
  output: {schema: YoutubeChatbotOutputSchema},
  prompt: `You are an expert at answering questions about a YouTube video.
  
Use the content of the following YouTube video to answer the user's question.
Video URL: {{{youtubeVideoUrl}}}
  
Question: {{{question}}}
  
Answer the question based *only* on the video's content. If the answer is not in the video, say that you cannot find the answer in the video.`,
});

const youtubeChatbotFlow = ai.defineFlow(
  {
    name: 'youtubeChatbotFlow',
    inputSchema: YoutubeChatbotInputSchema,
    outputSchema: YoutubeChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
