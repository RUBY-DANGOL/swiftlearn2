'use server';

/**
 * @fileOverview An AI flow to extract structured notes from a web link.
 *
 * - extractNotesFromLink - A function that takes a URL and extracts notes.
 * - ExtractNotesInput - The input type for the extractNotesFromLink function.
 * - ExtractNotesOutput - The return type for the extractNotesFromLink function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractNotesInputSchema = z.object({
  url: z.string().url().describe('The URL of the web page to extract notes from.'),
  topic: z.string().describe('The specific topic the notes should focus on.'),
});
export type ExtractNotesInput = z.infer<typeof ExtractNotesInputSchema>;

const ExtractNotesOutputSchema = z.object({
  notes: z.string().describe('The extracted notes in Markdown format.'),
});
export type ExtractNotesOutput = z.infer<typeof ExtractNotesOutputSchema>;

export async function extractNotesFromLink(input: ExtractNotesInput): Promise<ExtractNotesOutput> {
  return extractNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractNotesPrompt',
  input: {schema: ExtractNotesInputSchema},
  output: {schema: ExtractNotesOutputSchema},
  prompt: `You are an expert at extracting educational content from web pages and formatting it as high-quality study notes.

Your task is to analyze the content from the following web page: {{{url}}}

The notes should be specifically about the topic of: {{{topic}}}

Generate a detailed set of notes based on the relevant information on the page. The notes must be well-structured and returned in Markdown format. Use headings, subheadings, bullet points (using * or -), and bold text to highlight key concepts, definitions, and formulas.

Focus exclusively on the main educational content related to the topic. Ignore all irrelevant parts of the page such as advertisements, navigation menus, sidebars, footers, and comment sections.

The final output should be only the Markdown text of the notes.`,
});

const extractNotesFlow = ai.defineFlow(
  {
    name: 'extractNotesFlow',
    inputSchema: ExtractNotesInputSchema,
    outputSchema: ExtractNotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
