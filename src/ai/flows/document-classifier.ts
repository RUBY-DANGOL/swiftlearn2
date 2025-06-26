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

const subjectsEn = ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science', 'Other'] as const;
const SubjectEnumEn = z.enum(subjectsEn);
const subjectsNe = ['भौतिक विज्ञान', 'रसायन विज्ञान', 'जीव विज्ञान', 'गणित', 'कम्प्युटर विज्ञान', 'अन्य'] as const;
const SubjectEnumNe = z.enum(subjectsNe);


const ClassifyDocumentInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
    language: z.enum(['en', 'ne']).optional().default('en').describe('The language for the output.'),
});
export type ClassifyDocumentInput = z.infer<typeof ClassifyDocumentInputSchema>;

const ClassifyDocumentOutputSchema = z.object({
  subject: z.string().describe('The subject the document is classified as.'),
});
export type ClassifyDocumentOutput = z.infer<typeof ClassifyDocumentOutputSchema>;

export async function classifyDocument(input: ClassifyDocumentInput): Promise<ClassifyDocumentOutput> {
  return classifyDocumentFlow(input);
}

const englishPrompt = ai.definePrompt({
  name: 'classifyDocumentPromptEn',
  input: {schema: ClassifyDocumentInputSchema},
  output: {schema: z.object({ subject: SubjectEnumEn })},
  prompt: `You are an expert document classifier. Analyze the content of the provided PDF document and classify it into one of the following subjects: ${subjectsEn.join(', ')}.

If the document does not fit well into any of these categories, classify it as 'Other'.

PDF Document: {{media url=pdfDataUri}}`,
});

const nepaliPrompt = ai.definePrompt({
  name: 'classifyDocumentPromptNe',
  input: {schema: ClassifyDocumentInputSchema},
  output: {schema: z.object({ subject: SubjectEnumNe })},
  prompt: `तपाईं एक विशेषज्ञ कागजात वर्गीकरणकर्ता हुनुहुन्छ। प्रदान गरिएको PDF कागजातको सामग्री विश्लेषण गर्नुहोस् र यसलाई निम्न विषयहरू मध्ये एकमा वर्गीकृत गर्नुहोस्: ${subjectsNe.join(', ')}।

यदि कागजात यी मध्ये कुनै पनि श्रेणीमा राम्रोसँग फिट हुँदैन भने, यसलाई 'अन्य' को रूपमा वर्गीकृत गर्नुहोस्।

PDF कागजात: {{media url=pdfDataUri}}`,
});

const classifyDocumentFlow = ai.defineFlow(
  {
    name: 'classifyDocumentFlow',
    inputSchema: ClassifyDocumentInputSchema,
    outputSchema: ClassifyDocumentOutputSchema,
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
