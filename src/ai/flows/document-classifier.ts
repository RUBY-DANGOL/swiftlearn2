'use server';

/**
 * @fileOverview An AI flow to classify a document into a subject category.
 *
 * - classifyDocument - A function that classifies a PDF document.
 * - ClassifyDocumentInput - The input type for the classifyDocument function.
 * - ClassifyDocumentOutput - The return type for the classifyDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const subjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science', 'Other'] as const;
const SubjectEnum = z.enum(subjects);

const ClassifyDocumentInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ClassifyDocumentInput = z.infer<typeof ClassifyDocumentInputSchema>;

const ClassifyDocumentOutputSchema = z.object({
  subject: SubjectEnum.describe('The subject the document is classified as.'),
});
export type ClassifyDocumentOutput = z.infer<typeof ClassifyDocumentOutputSchema>;

export async function classifyDocument(input: ClassifyDocumentInput): Promise<ClassifyDocumentOutput> {
  return classifyDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyDocumentPrompt',
  input: {schema: ClassifyDocumentInputSchema},
  output: {schema: ClassifyDocumentOutputSchema},
  prompt: `You are an expert document classifier. Analyze the content of the provided PDF document and classify it into one of the following subjects: ${subjects.join(', ')}.

If the document does not fit well into any of these categories, classify it as 'Other'.

PDF Document: {{media url=pdfDataUri}}`,
});

const classifyDocumentFlow = ai.defineFlow(
  {
    name: 'classifyDocumentFlow',
    inputSchema: ClassifyDocumentInputSchema,
    outputSchema: ClassifyDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
