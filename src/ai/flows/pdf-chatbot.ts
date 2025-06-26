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
  language: z.enum(['en', 'ne']).optional().default('en').describe('The language for the output.'),
});
export type PdfChatbotInput = z.infer<typeof PdfChatbotInputSchema>;

const PdfChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about the PDF document.'),
});
export type PdfChatbotOutput = z.infer<typeof PdfChatbotOutputSchema>;

export async function pdfChatbot(input: PdfChatbotInput): Promise<PdfChatbotOutput> {
  return pdfChatbotFlow(input);
}

const englishPrompt = ai.definePrompt({
  name: 'pdfChatbotPromptEn',
  input: {schema: PdfChatbotInputSchema},
  output: {schema: PdfChatbotOutputSchema},
  prompt: `You are a chatbot that answers questions about a PDF document.

  Use the following PDF document as the source of information to answer the question.

  PDF Document: {{media url=pdfDataUri}}

  Question: {{{question}}}

  Answer:`,
});

const nepaliPrompt = ai.definePrompt({
  name: 'pdfChatbotPromptNe',
  input: {schema: PdfChatbotInputSchema},
  output: {schema: PdfChatbotOutputSchema},
  prompt: `तपाईं एक च्याटबोट हुनुहुन्छ जसले PDF कागजातको बारेमा प्रश्नहरूको उत्तर दिनुहुन्छ।

प्रश्नको उत्तर दिनको लागि निम्न PDF कागजातलाई जानकारीको स्रोतको रूपमा प्रयोग गर्नुहोस्।

PDF कागजात: {{media url=pdfDataUri}}

प्रश्न: {{{question}}}

उत्तर:`,
});


const pdfChatbotFlow = ai.defineFlow(
  {
    name: 'pdfChatbotFlow',
    inputSchema: PdfChatbotInputSchema,
    outputSchema: PdfChatbotOutputSchema,
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
