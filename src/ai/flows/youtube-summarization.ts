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
  language: z.enum(['en', 'ne']).optional().default('en').describe('The language for the output.'),
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

const englishPrompt = ai.definePrompt({
  name: 'youtubeSummarizationPromptEn',
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

const nepaliPrompt = ai.definePrompt({
  name: 'youtubeSummarizationPromptNe',
  input: {schema: YoutubeSummarizationInputSchema},
  output: {schema: YoutubeSummarizationOutputSchema},
  prompt: `तपाईं एक विशेषज्ञ हुनुहुन्छ जसले शैक्षिक YouTube भिडियोहरूको विश्लेषण र व्याख्या गर्नुहुन्छ। तपाईंको लक्ष्य भिडियोको सामग्रीलाई बुझ्न सजिलो बनाउनु हो, एक विशेष विषयमा ध्यान केन्द्रित गर्दै।

यो लिङ्कबाट भिडियोको विश्लेषण गर्नुहोस्: {{{youtubeVideoLink}}}

विश्लेषण विशेष रूपमा यस विषयमा केन्द्रित हुनुपर्छ: **{{{topic}}}**

तपाईंको प्रतिक्रियामा दुई भाग हुनुपर्छ:
1.  भिडियोको एक संक्षिप्त, उच्च-स्तरीय सारांश, निर्दिष्ट विषयसँग सम्बन्धित भागहरूमा ध्यान केन्द्रित गर्दै।
2.  भिडियोका मुख्य विषयहरू वा मुख्य क्षणहरूको सूची जुन **{{{topic}}}** सँग सम्बन्धित छन्। प्रत्येक मुख्य क्षणको लागि, तपाईंले प्रदान गर्नुपर्छ:
    - विषय सुरु हुने सही टाइमस्ट्याम्प (MM:SS वा HH:MM:SS ढाँचामा)।
    - विषयको लागि छोटो, वर्णनात्मक शीर्षक।
    - त्यस खण्डमा छलफल गरिएको अवधारणाको विस्तृत व्याख्या।

टाइमस्ट्याम्पहरू सही छन् र स्पष्टीकरणहरू स्पष्ट, सिक्नका लागि सहयोगी, र प्रदान गरिएको विषयसँग प्रत्यक्ष रूपमा सम्बन्धित छन् भनी सुनिश्चित गर्नुहोस्।`,
});


const youtubeSummarizationFlow = ai.defineFlow(
  {
    name: 'youtubeSummarizationFlow',
    inputSchema: YoutubeSummarizationInputSchema,
    outputSchema: YoutubeSummarizationOutputSchema,
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
