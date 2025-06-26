'use server';

/**
 * @fileOverview PDF summarization and question answering AI agent.
 *
 * - pdfChatbot - A function that handles the PDF processing and question answering.
 * - PdfChatbotInput - The input type for the pdfChatbot function.
 * - PdfChatbotOutput - The return type for the pdfChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PdfChatbotInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      'A PDF document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Ensure proper format
    ),
  question: z.string().describe('The question to ask about the PDF document.'),
});
export type PdfChatbotInput = z.infer<typeof PdfChatbotInputSchema>;

const PdfChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about the PDF document.'),
});
export type PdfChatbotOutput = z.infer<typeof PdfChatbotOutputSchema>;

export async function pdfChatbot(input: PdfChatbotInput): Promise<PdfChatbotOutput> {
  return pdfChatbotFlow(input);
}

const pdfChatbotPrompt = ai.definePrompt({
  name: 'pdfChatbotPrompt',
  input: {schema: PdfChatbotInputSchema},
  output: {schema: PdfChatbotOutputSchema},
  prompt: `You are a chatbot that answers questions about a PDF document.

  Use the following PDF document as the source of information to answer the question.

  PDF Document: {{media url=pdfDataUri}}

  Question: {{{question}}}

  Answer:`,
});

const pdfChatbotFlow = ai.defineFlow(
  {
    name: 'pdfChatbotFlow',
    inputSchema: PdfChatbotInputSchema,
    outputSchema: PdfChatbotOutputSchema,
  },
  async input => {
    const {output} = await pdfChatbotPrompt(input);
    return output!;
  }
);
