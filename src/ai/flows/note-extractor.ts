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
  language: z.enum(['en', 'ne']).optional().default('en').describe('The language for the output notes.'),
});
export type ExtractNotesInput = z.infer<typeof ExtractNotesInputSchema>;

const ExtractNotesOutputSchema = z.object({
  notes: z.string().describe('The extracted notes in Markdown format.'),
});
export type ExtractNotesOutput = z.infer<typeof ExtractNotesOutputSchema>;

export async function extractNotesFromLink(input: ExtractNotesInput): Promise<ExtractNotesOutput> {
  return extractNotesFlow(input);
}

const englishPrompt = ai.definePrompt({
  name: 'extractNotesPromptEn',
  input: {schema: ExtractNotesInputSchema},
  output: {schema: ExtractNotesOutputSchema},
  prompt: `You are an expert at extracting educational content from web pages and formatting it as high-quality study notes.

Your task is to analyze the content from the following web page: {{{url}}}

The notes should be specifically about the topic of: {{{topic}}}

Generate a detailed set of notes based on the relevant information on the page. The notes must be well-structured and returned in Markdown format. Use headings, subheadings, bullet points (using * or -), and bold text to highlight key concepts, definitions, and formulas.

Focus exclusively on the main educational content related to the topic. Ignore all irrelevant parts of the page such as advertisements, navigation menus, sidebars, footers, and comment sections.

The final output should be only the Markdown text of the notes.`,
});

const nepaliPrompt = ai.definePrompt({
    name: 'extractNotesPromptNe',
    input: {schema: ExtractNotesInputSchema},
    output: {schema: ExtractNotesOutputSchema},
    prompt: `तपाईं वेब पृष्ठहरूबाट शैक्षिक सामग्री निकालेर उच्च-गुणस्तरको अध्ययन नोटको रूपमा ढाँचा बनाउनमा विशेषज्ञ हुनुहुन्छ।

तपाईंको कार्य निम्न वेब पृष्ठबाट सामग्रीको विश्लेषण गर्नु हो: {{{url}}}

नोटहरू विशेष रूपमा यस विषयमा केन्द्रित हुनुपर्छ: {{{topic}}}

पृष्ठमा सान्दर्भिक जानकारीको आधारमा विस्तृत नोटहरूको सेट उत्पन्न गर्नुहोस्। नोटहरू राम्रोसँग संरचित हुनुपर्छ र मार्कडाउन ढाँचामा फर्काइनुपर्छ। मुख्य अवधारणाहरू, परिभाषाहरू, र सूत्रहरू हाइलाइट गर्न हेडिङहरू, सबहेडिङहरू, बुलेट पोइन्टहरू (* वा - प्रयोग गरेर), र बोल्ड टेक्स्ट प्रयोग गर्नुहोस्।

विषयसँग सम्बन्धित मुख्य शैक्षिक सामग्रीमा मात्र ध्यान केन्द्रित गर्नुहोस्। पृष्ठका सबै अप्रासंगिक भागहरू जस्तै विज्ञापन, नेभिगेसन मेनु, साइडबार, फुटर, र टिप्पणी खण्डहरूलाई बेवास्ता गर्नुहोस्।

अन्तिम आउटपुट केवल नोटहरूको मार्कडाउन पाठ हुनुपर्छ।`,
});

const extractNotesFlow = ai.defineFlow(
  {
    name: 'extractNotesFlow',
    inputSchema: ExtractNotesInputSchema,
    outputSchema: ExtractNotesOutputSchema,
  },
  async (input) => {
    if (input.language === 'ne') {
        const {output} = await nepaliPrompt(input);
        return output!;
    }
    const {output} = await englishPrompt(input);
    return output!;
  }
);
