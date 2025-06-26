'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Send, Wand2, Upload, Lightbulb } from 'lucide-react';
import { summarizePdf } from '@/ai/flows/pdf-summarization';
import { pdfChatbot } from '@/ai/flows/pdf-chatbot';
import { classifyDocument } from '@/ai/flows/document-classifier';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from './ui/separator';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Badge } from './ui/badge';

type ChatMessage = {
  role: 'user' | 'bot';
  content: string;
};

const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
};

export function PdfTool() {
  const { toast } = useToast();
  const [summary, setSummary] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [pdfDataUri, setPdfDataUri] = useState('');
  const [fileName, setFileName] = useState('');
  const [classification, setClassification] = useState('');

  const chatForm = useForm({ defaultValues: { message: '' } });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Please upload a PDF file.',
        });
        return;
      }
      setFileName(file.name);
      setSummary('');
      setChatHistory([]);
      setClassification('');
      setIsProcessing(true);
      
      try {
        const dataUri = await fileToDataUri(file);
        setPdfDataUri(dataUri);

        const [classificationResult, summaryResult] = await Promise.all([
          classifyDocument({ pdfDataUri: dataUri }),
          summarizePdf({ pdfDataUri: dataUri }),
        ]);

        setClassification(classificationResult.subject);
        setSummary(summaryResult.summary);
        setChatHistory([{ role: 'bot', content: "I've summarized the PDF for you. Ask me anything about it!" }]);
      } catch (error) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to process the PDF file.',
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleChatSubmit = async (values: { message: string }) => {
    if (!values.message.trim() || !pdfDataUri) return;

    const newHumanMessage: ChatMessage = { role: 'user', content: values.message };
    setChatHistory(prev => [...prev, newHumanMessage]);
    setIsChatting(true);
    chatForm.reset();

    try {
      const result = await pdfChatbot({ pdfDataUri, question: values.message });
      const newAiMessage: ChatMessage = { role: 'bot', content: result.answer };
      setChatHistory(prev => [...prev, newAiMessage]);
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to get a response from the chatbot.' });
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>PDF Document Tool</CardTitle>
        <CardDescription>Upload a PDF to classify its subject, get a summary, and start a chat session.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-2">
          <div className="flex-grow">
            <label htmlFor="pdf-upload" className="sr-only">Upload PDF</label>
            <Input id="pdf-upload" type="file" accept="application/pdf" onChange={handleFileChange} disabled={isProcessing} className="pt-2 text-sm text-muted-foreground" />
            {fileName && <p className="text-xs text-muted-foreground mt-1">File: {fileName}</p>}
          </div>
        </div>

        {isProcessing && (
            <div className="mt-6 flex flex-col items-center justify-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Analyzing document... please wait.</p>
            </div>
        )}
        
        {classification && !isProcessing && (
          <div className="mt-4">
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-primary"/>
                  <p className="text-sm text-foreground">
                      This document seems to be about: <Badge variant="secondary" className="font-semibold">{classification}</Badge>
                  </p>
              </div>
          </div>
        )}
        
        {(summary || classification) && !isProcessing && <Separator className="my-6" />}

        {summary && !isProcessing && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Summary</h3>
              <div className="p-4 bg-muted/50 rounded-lg text-sm">{summary}</div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Chatbot</h3>
              <div className="border rounded-lg p-4">
                <ScrollArea className="h-64 mb-4 pr-4">
                  <div className="space-y-4">
                    {chatHistory.map((msg, index) => (
                      <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'bot' && <Avatar className="w-8 h-8"><AvatarFallback>AI</AvatarFallback></Avatar>}
                        <p className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.role === 'bot' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                          {msg.content}
                        </p>
                        {msg.role === 'user' && <Avatar className="w-8 h-8"><AvatarFallback>You</AvatarFallback></Avatar>}
                      </div>
                    ))}
                    {isChatting && (
                        <div className="flex items-start gap-3">
                            <Avatar className="w-8 h-8"><AvatarFallback>AI</AvatarFallback></Avatar>
                            <p className="rounded-lg px-4 py-2 bg-muted flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
                            </p>
                        </div>
                    )}
                  </div>
                </ScrollArea>
                 <Form {...chatForm}>
                  <form onSubmit={chatForm.handleSubmit(handleChatSubmit)} className="flex items-center gap-2">
                    <FormField
                      control={chatForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormControl>
                            <Input placeholder="Ask a follow-up question..." {...field} disabled={isChatting || isProcessing} autoComplete="off" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="icon" disabled={isChatting || isProcessing}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
