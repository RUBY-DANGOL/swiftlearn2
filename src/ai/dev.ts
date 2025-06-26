import { config } from 'dotenv';
config();

import '@/ai/flows/youtube-summarization.ts';
import '@/ai/flows/pdf-summarization.ts';
import '@/ai/flows/youtube-chatbot.ts';
import '@/ai/flows/pdf-chatbot.ts';
import '@/ai/flows/math-question-solver.ts';