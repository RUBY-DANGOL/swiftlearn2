'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Send } from 'lucide-react';
import { contextualChatbot } from '@/ai/flows/contextual-chatbot';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem } from './ui/form';

type ChatMessage = {
  role: 'user' | 'bot';
  content: string;
};

interface ContextualChatbotProps {
    context: string;
}

export function ContextualChatbot({ context }: ContextualChatbotProps) {
  const { toast } = useToast();
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([{ role: 'bot', content: "Hello! Ask me anything about the notes for this topic." }]);
  const [isChatting, setIsChatting] = useState(false);

  const chatForm = useForm({ defaultValues: { message: '' } });

  const handleChatSubmit = async (values: { message: string }) => {
    if (!values.message.trim()) return;

    const newHumanMessage: ChatMessage = { role: 'user', content: values.message };
    setChatHistory(prev => [...prev, newHumanMessage]);
    setIsChatting(true);
    chatForm.reset();

    try {
      const result = await contextualChatbot({ context, question: values.message });
      const newAiMessage: ChatMessage = { role: 'bot', content: result.answer };
      setChatHistory(prev => [...prev, newAiMessage]);
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to get a response from the chatbot.' });
      const newErrorMessage: ChatMessage = { role: 'bot', content: 'Sorry, I encountered an error. Please try again.' };
      setChatHistory(prev => [...prev, newErrorMessage]);
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="border rounded-lg p-4">
            <ScrollArea className="h-96 mb-4 pr-4">
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
                        <Input placeholder="Ask a question about the notes..." {...field} disabled={isChatting} autoComplete="off" />
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
      </CardContent>
    </Card>
  );
}
