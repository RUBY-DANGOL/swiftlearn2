'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/youtube-summarization.ts';
import '@/ai/flows/pdf-summarization.ts';
import '@/ai/flows/youtube-chatbot.ts';
import '@/ai/flows/pdf-chatbot.ts';
import '@/ai/flows/document-classifier.ts';
import '@/ai/flows/note-extractor.ts';
import '@/ai/flows/contextual-chatbot.ts';
import '@/ai/flows/quiz-generator.ts';
import '@/ai/flows/math-question-solver.ts';
import '@/ai/flows/programmer-guide-flow.ts';
import '@/ai/flows/video-suggester.ts';
