'use server';

/**
 * @fileOverview An AI flow to suggest learning videos based on a topic.
 *
 * - suggestVideos - A function that suggests videos for a given topic.
 * - SuggestVideosInput - The input type for the suggestVideos function.
 * - SuggestVideosOutput - The return type for the suggestVideos function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestVideosInputSchema = z.object({
  topic: z.string().describe('The educational topic to find videos for.'),
});
export type SuggestVideosInput = z.infer<typeof SuggestVideosInputSchema>;

const VideoSuggestionSchema = z.object({
    title: z.string().describe("A concise, descriptive title for a type of tutorial video."),
    searchQuery: z.string().describe("A highly relevant YouTube search query that would find tutorial videos for the given topic."),
    description: z.string().describe("A brief, one-sentence description of what a student would learn from videos on this topic.")
});

const SuggestVideosOutputSchema = z.object({
  suggestions: z.array(VideoSuggestionSchema).length(3).describe('An array of 3 distinct video suggestions.'),
});
export type SuggestVideosOutput = z.infer<typeof SuggestVideosOutputSchema>;
export type VideoSuggestion = z.infer<typeof VideoSuggestionSchema>;


export async function suggestVideos(input: SuggestVideosInput): Promise<SuggestVideosOutput> {
  return suggestVideosFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestVideosPrompt',
  input: {schema: SuggestVideosInputSchema},
  output: {schema: SuggestVideosOutputSchema},
  prompt: `You are an expert academic advisor who helps students find the best educational video content on YouTube.

For the given topic, please suggest 3 distinct and effective YouTube search queries that a student could use to find high-quality tutorial videos. For each suggestion, provide a concise title for the search category and a short description of what the student would learn.

Focus on queries that would lead to clear, well-explained tutorials. For example, for "Quadratic Equations", good queries would be "solving quadratic equations by factoring" or "quadratic formula tutorial".

Topic: {{{topic}}}
`,
});

const suggestVideosFlow = ai.defineFlow(
  {
    name: 'suggestVideosFlow',
    inputSchema: SuggestVideosInputSchema,
    outputSchema: SuggestVideosOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
