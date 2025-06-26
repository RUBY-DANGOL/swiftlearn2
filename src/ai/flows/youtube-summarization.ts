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
  topic: z.string().describe('The specific topic to focus on within the video.'),
});
export type YoutubeSummarizationInput = z.infer<typeof YoutubeSummarizationInputSchema>;

const TimecodedExplanationSchema = z.object({
  timestamp: z.string().describe('The timestamp of the segment in MM:SS or HH:MM:SS format.'),
  title: z.string().describe('The title of the video segment.'),
  explanation: z.string().describe('A detailed explanation of the video segment.'),
});

const YoutubeSummarizationOutputSchema = z.object({
  summary: z.string().describe('A concise, overall summary of the entire YouTube video.'),
  timecodedExplanations: z.array(TimecodedExplanationSchema).describe('An array of time-coded explanations for key video segments.'),
});
export type YoutubeSummarizationOutput = z.infer<typeof YoutubeSummarizationOutputSchema>;

export async function youtubeSummarization(input: YoutubeSummarizationInput): Promise<YoutubeSummarizationOutput> {
  return youtubeSummarizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'youtubeSummarizationPrompt',
  input: {schema: YoutubeSummarizationInputSchema},
  output: {schema: YoutubeSummarizationOutputSchema},
  prompt: `You are an expert at analyzing and explaining educational YouTube videos. Your goal is to make the video's content easy to understand, focusing on a specific topic.
    
Analyze the video from this link: {{{youtubeVideoLink}}}.

The analysis should focus specifically on the topic of: **{{{topic}}}**

Your response must have two parts:
1.  A concise, high-level summary of the video, concentrating on the parts relevant to the specified topic.
2.  A list of the main topics or key moments from the video that are related to **{{{topic}}}**. For each key moment, you must provide:
    - The exact timestamp where the topic begins (in MM:SS or HH:MM:SS format).
    - A short, descriptive title for the topic.
    - A detailed explanation of the concept discussed in that segment.
    
Make sure the timestamps are accurate and the explanations are clear, helpful for learning, and directly related to the topic provided.`,
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
