'use server';

/**
 * @fileOverview PDF summarization flow.
 *
 * - summarizePdf - A function that summarizes a PDF document.
 * - SummarizePdfInput - The input type for the summarizePdf function.
 * - SummarizePdfOutput - The return type for the summarizePdf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePdfInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      'The PDF document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected the expected format
    ),
  language: z.enum(['en', 'ne']).optional().default('en').describe('The language for the output.'),
});
export type SummarizePdfInput = z.infer<typeof SummarizePdfInputSchema>;

const SummarizePdfOutputSchema = z.object({
  summary: z.string().describe('The summary of the PDF document.'),
});
export type SummarizePdfOutput = z.infer<typeof SummarizePdfOutputSchema>;

export async function summarizePdf(input: SummarizePdfInput): Promise<SummarizePdfOutput> {
  return summarizePdfFlow(input);
}

const englishPrompt = ai.definePrompt({
  name: 'summarizePdfPromptEn',
  input: {schema: SummarizePdfInputSchema},
  output: {schema: SummarizePdfOutputSchema},
  prompt: `Summarize the following PDF document. 

PDF Document: {{media url=pdfDataUri}}`,
});

const nepaliPrompt = ai.definePrompt({
  name: 'summarizePdfPromptNe',
  input: {schema: SummarizePdfInputSchema},
  output: {schema: SummarizePdfOutputSchema},
  prompt: `निम्न PDF कागजातको सारांश लेख्नुहोस्।

PDF कागजात: {{media url=pdfDataUri}}`,
});

const summarizePdfFlow = ai.defineFlow(
  {
    name: 'summarizePdfFlow',
    inputSchema: SummarizePdfInputSchema,
    outputSchema: SummarizePdfOutputSchema,
  },
  async input => {
    if (input.language === 'ne') {
      const {output} = await nepaliPrompt(input);
      return output!;
    }
    const {output} = await englishPrompt(input);
    return output!;
  }
);
