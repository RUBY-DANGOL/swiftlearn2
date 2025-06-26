// src/ai/flows/youtube-chatbot.ts
'use server';

/**
 * @fileOverview YouTube video summarization and question answering flow.
 *
 * - youtubeChatbot - A function that accepts a YouTube video URL and a question, then answers the question based on the video content.
 * - YoutubeChatbotInput - The input type for the youtubeChatbot function.
 * - YoutubeChatbotOutput - The return type for the youtubeChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const YoutubeChatbotInputSchema = z.object({
  youtubeVideoUrl: z.string().describe('The URL of the YouTube video.'),
  question: z.string().describe('The question to ask about the video.'),
  topic: z.string().optional().describe('The topic context for the conversation.'),
  language: z.enum(['en', 'ne']).optional().default('en').describe('The language for the output.'),
});
export type YoutubeChatbotInput = z.infer<typeof YoutubeChatbotInputSchema>;

const YoutubeChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the question based on the video content.'),
});
export type YoutubeChatbotOutput = z.infer<typeof YoutubeChatbotOutputSchema>;

export async function youtubeChatbot(input: YoutubeChatbotInput): Promise<YoutubeChatbotOutput> {
  return youtubeChatbotFlow(input);
}

const englishPrompt = ai.definePrompt({
  name: 'youtubeChatbotPromptEn',
  input: {schema: YoutubeChatbotInputSchema},
  output: {schema: YoutubeChatbotOutputSchema},
  prompt: `You are an expert at answering questions about a YouTube video, with a focus on a specific topic.
  
Use the content of the following YouTube video to answer the user's question.
Video URL: {{{youtubeVideoUrl}}}
{{#if topic}}
The conversation is about the topic of: **{{{topic}}}**. Please keep your answers relevant to this topic when possible.
{{/if}}
  
Question: {{{question}}}
  
Answer the question based *only* on the video's content. If the answer is not in the video, say that you cannot find the answer in the video.`,
});

const nepaliPrompt = ai.definePrompt({
  name: 'youtubeChatbotPromptNe',
  input: {schema: YoutubeChatbotInputSchema},
  output: {schema: YoutubeChatbotOutputSchema},
  prompt: `तपाईं एक विशेषज्ञ हुनुहुन्छ जसले YouTube भिडियोको बारेमा प्रश्नहरूको उत्तर दिनुहुन्छ, एक विशेष विषयमा ध्यान केन्द्रित गर्दै।

प्रयोगकर्ताको प्रश्नको उत्तर दिन निम्न YouTube भिडियोको सामग्री प्रयोग गर्नुहोस्।
भिडियो URL: {{{youtubeVideoUrl}}}
{{#if topic}}
कुराकानी यस विषयमा केन्द्रित छ: **{{{topic}}}**। कृपया सम्भव भएसम्म आफ्ना उत्तरहरू यस विषयमा सान्दर्भिक राख्नुहोस्।
{{/if}}

प्रश्न: {{{question}}}

भिडियोको सामग्रीको आधारमा मात्र प्रश्नको उत्तर दिनुहोस्। यदि उत्तर भिडियोमा छैन भने, भन्नुहोस् कि तपाईंले भिडियोमा उत्तर फेला पार्न सक्नुभएन।`,
});

const youtubeChatbotFlow = ai.defineFlow(
  {
    name: 'youtubeChatbotFlow',
    inputSchema: YoutubeChatbotInputSchema,
    outputSchema: YoutubeChatbotOutputSchema,
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
