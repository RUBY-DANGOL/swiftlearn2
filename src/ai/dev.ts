import { config } from 'dotenv';
config();

import '@/ai/flows/youtube-summarization.ts';
import '@/ai/flows/pdf-summarization.ts';
import '@/ai/flows/youtube-chatbot.ts';
import '@/ai/flows/pdf-chatbot.ts';
import '@/ai/flows/document-classifier.ts';
import '@/ai/flows/note-extractor.ts';
