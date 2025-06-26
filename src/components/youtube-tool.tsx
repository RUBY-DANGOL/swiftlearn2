'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Send, Wand2 } from 'lucide-react';
import { youtubeSummarization } from '@/ai/flows/youtube-summarization';
import { youtubeChatbot } from '@/ai/flows/youtube-chatbot';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from './ui/separator';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid YouTube URL.' }),
});

type ChatMessage = {
  role: 'user' | 'bot';
  content: string;
};

export function YoutubeTool() {
  const { toast } = useToast();
  const [summary, setSummary] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: '' },
  });

  const chatForm = useForm({
    defaultValues: { message: '' },
  });

  const handleSummarize = async (values: z.infer<typeof formSchema>) => {
    setIsSummarizing(true);
    setSummary('');
    setChatHistory([]);
    setCurrentUrl(values.url);
    try {
      const result = await youtubeSummarization({ youtubeVideoLink: values.url });
      setSummary(result.summary);
      setChatHistory([{ role: 'bot', content: "I've summarized the video for you. Ask me anything about it!" }]);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to summarize the YouTube video.',
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleChatSubmit = async (values: { message: string }) => {
    if (!values.message.trim() || !currentUrl) return;

    const newHumanMessage: ChatMessage = { role: 'user', content: values.message };
    setChatHistory(prev => [...prev, newHumanMessage]);
    setIsChatting(true);
    chatForm.reset();

    try {
      const result = await youtubeChatbot({ youtubeVideoUrl: currentUrl, question: values.message });
      const newAiMessage: ChatMessage = { role: 'bot', content: result.answer };
      setChatHistory(prev => [...prev, newAiMessage]);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get a response from the chatbot.',
      });
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>YouTube Video Summarizer</CardTitle>
        <CardDescription>Enter a YouTube URL to get a summary and start a chat session.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSummarize)} className="flex items-start gap-2">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input placeholder="https://www.youtube.com/watch?v=..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSummarizing}>
              {isSummarizing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              <span className="ml-2 hidden sm:inline">Summarize</span>
            </Button>
          </form>
        </Form>
        
        {(isSummarizing || summary) && <Separator className="my-6" />}

        {isSummarizing && (
          <div className="flex flex-col items-center justify-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Summarizing video... please wait.</p>
          </div>
        )}

        {summary && (
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
                            <Input placeholder="Ask a follow-up question..." {...field} disabled={isChatting} autoComplete="off"/>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="icon" disabled={isChatting}>
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
