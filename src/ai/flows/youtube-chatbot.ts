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

const youtubeVideoContentTool = ai.defineTool({
  name: 'youtubeVideoContentTool',
  description: 'Retrieves the content of a YouTube video given its URL.',
  inputSchema: z.object({
    youtubeVideoUrl: z.string().describe('The URL of the YouTube video.'),
  }),
  outputSchema: z.string(),
},
async (input) => {
  // Placeholder implementation:  Assume a service exists to fetch video content.
  // In a real application, this would call an external service or API.
  // For now, return a canned response.
  console.log("Fetching video content from: " + input.youtubeVideoUrl);
  return `This is the content of the YouTube video at ${input.youtubeVideoUrl}.  It discusses various aspects of the topic, provides examples, and offers further resources.`;
}
);

const prompt = ai.definePrompt({
  name: 'youtubeChatbotPrompt',
  input: {schema: YoutubeChatbotInputSchema},
  output: {schema: YoutubeChatbotOutputSchema},
  tools: [youtubeVideoContentTool],
  system: `You are a chatbot that answers questions about YouTube videos.  Use the youtubeVideoContentTool to get the content of the video, and then answer the question based on that content.  If you cannot answer the question based on the video content, say so.`,
  prompt: `Question: {{{question}}}`, // Just ask the question
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
