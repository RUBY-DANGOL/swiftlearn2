'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { codingChallenges, type CodingChallenge } from '@/lib/coding-challenges';
import { Loader2, MessageSquare, Play, Send, Terminal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { programmerGuide } from '@/ai/flows/programmer-guide-flow';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Input } from './ui/input';

type Language = 'cpp';
type ChatMessage = {
  role: 'user' | 'bot';
  content: string;
};

export function ProgrammingIDE() {
  const { toast } = useToast();
  const [currentChallenge, setCurrentChallenge] = useState<CodingChallenge>(codingChallenges[0]);
  const [language, setLanguage] = useState<Language>('cpp');
  const [code, setCode] = useState(currentChallenge.starterCode[language]);
  
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatting, setIsChatting] = useState(false);

  const chatForm = useForm({ defaultValues: { message: '' } });

  useEffect(() => {
    setCode(currentChallenge.starterCode[language]);
    setChatHistory([{ role: 'bot', content: `Hello! I'm your AI guide. How can I help you with the "${currentChallenge.title}" challenge in C/C++?` }]);
    chatForm.reset();
  }, [currentChallenge, language, chatForm]);

  const handleRunCode = () => {
    toast({
      title: 'Compiler Prototype',
      description: 'Run functionality is not available in this prototype.',
    });
  };

  const handleChatSubmit = async (values: { message: string }) => {
    if (!values.message.trim()) return;

    const newHumanMessage: ChatMessage = { role: 'user', content: values.message };
    setChatHistory(prev => [...prev, newHumanMessage]);
    setIsChatting(true);
    chatForm.reset();

    try {
      const result = await programmerGuide({
        challengeTitle: currentChallenge.title,
        challengeDescription: currentChallenge.description,
        language: 'c++',
        userCode: code,
        userQuestion: values.message,
      });
      const newAiMessage: ChatMessage = { role: 'bot', content: result.guidance };
      setChatHistory(prev => [...prev, newAiMessage]);
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to get a response from the AI guide.' });
      const newErrorMessage: ChatMessage = { role: 'bot', content: 'Sorry, I encountered an error. Please try again.' };
      setChatHistory(prev => [...prev, newErrorMessage]);
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <Card className="lg:sticky lg:top-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Label htmlFor="challenge-select" className="shrink-0">Coding Challenge:</Label>
            <Select
              value={currentChallenge.id}
              onValueChange={(id) => setCurrentChallenge(codingChallenges.find(c => c.id === id)!)}
            >
              <SelectTrigger id="challenge-select" className="w-full sm:w-auto">
                <SelectValue placeholder="Select a challenge" />
              </SelectTrigger>
              <SelectContent>
                {codingChallenges.map(challenge => (
                  <SelectItem key={challenge.id} value={challenge.id}>
                    {challenge.title} ({challenge.difficulty})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-xl mb-2">{currentChallenge.title}</CardTitle>
          <CardDescription>{currentChallenge.description}</CardDescription>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CardTitle>Code Editor</CardTitle>
                <div className="w-48">
                  <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
                    Language: C/C++
                  </div>
                </div>
              </div>
              <Button onClick={handleRunCode}>
                <Play className="h-4 w-4" /> <span className="ml-2">Run</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-code h-80 text-sm"
              placeholder="Write your code here..."
            />
          </CardContent>
        </Card>
        
        <Tabs defaultValue="output" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="output" className="gap-2"><Terminal className="h-4 w-4" />Output</TabsTrigger>
            <TabsTrigger value="guide" className="gap-2"><MessageSquare className="h-4 w-4"/>AI Guide</TabsTrigger>
          </TabsList>
          <TabsContent value="output">
             <Card className="mt-2">
                <CardContent className="p-4">
                    <pre className="text-sm text-muted-foreground h-96">Click "Run" to see your code's output.</pre>
                </CardContent>
             </Card>
          </TabsContent>
          <TabsContent value="guide">
            <Card className="mt-2">
                <CardContent className="p-4">
                    <ScrollArea className="h-80 mb-4 pr-4">
                        <div className="space-y-4">
                        {chatHistory.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'bot' && <Avatar className="w-8 h-8"><AvatarFallback>AI</AvatarFallback></Avatar>}
                            <p className={`rounded-lg px-4 py-2 max-w-[90%] text-sm ${msg.role === 'bot' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
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
                                <Input placeholder="Ask for a hint..." {...field} disabled={isChatting} autoComplete="off" />
                            </FormControl>
                            </FormItem>
                        )}
                        />
                        <Button type="submit" size="icon" disabled={isChatting}>
                        <Send className="h-4 w-4" />
                        </Button>
                    </form>
                    </Form>
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
