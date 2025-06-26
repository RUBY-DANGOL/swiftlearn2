'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Send, Wand2, PlayCircle } from 'lucide-react';
import { youtubeSummarization, type YoutubeSummarizationOutput } from '@/ai/flows/youtube-summarization';
import { youtubeChatbot } from '@/ai/flows/youtube-chatbot';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from './ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type TimecodedExplanation = YoutubeSummarizationOutput['timecodedExplanations'][0];

const formSchema = z.object({
  url: z.string().url({ message: 'कृपया एक मान्य YouTube URL प्रविष्ट गर्नुहोस्।' }),
  topic: z.string().min(1, { message: 'कृपया ध्यान केन्द्रित गर्न एउटा विषय प्रविष्ट गर्नुहोस्।' }),
});

type ChatMessage = {
  role: 'user' | 'bot';
  content: string;
};

export function YoutubeToolNepali() {
  const { toast } = useToast();
  const [summary, setSummary] = useState<string>('');
  const [timecodedExplanations, setTimecodedExplanations] = useState<TimecodedExplanation[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentTopic, setCurrentTopic] = useState('');
  const [videoId, setVideoId] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: '', topic: '' },
  });

  const chatForm = useForm({
    defaultValues: { message: '' },
  });

  const getYouTubeVideoId = (url: string) => {
    try {
      const urlObj = new URL(url);
      let videoId = '';
      if (urlObj.hostname === 'youtu.be') {
        videoId = urlObj.pathname.slice(1);
      } else if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
        if (urlObj.pathname === '/watch') {
          videoId = urlObj.searchParams.get('v') || '';
        } else if (urlObj.pathname.startsWith('/embed/')) {
          videoId = urlObj.pathname.split('/')[2];
        } else if (urlObj.pathname.startsWith('/v/')) {
            videoId = urlObj.pathname.split('/')[2];
        }
      }
      return videoId.split('?')[0].split('&')[0];
    } catch (e) {
      console.error('Invalid URL to parse:', e);
      return '';
    }
  };
  
  const timestampToSeconds = (timestamp: string) => {
    const parts = timestamp.split(':').map(Number);
    if (parts.some(isNaN)) return 0;
    if (parts.length === 3) { // HH:MM:SS
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    if (parts.length === 2) { // MM:SS
        return parts[0] * 60 + parts[1];
    }
    return 0;
  };

  const handleTimestampClick = (timestamp: string) => {
    if (!videoId) return;
    const seconds = timestampToSeconds(timestamp);
    setVideoUrl(`https://www.youtube.com/embed/${videoId}?start=${seconds}&autoplay=1`);
  };

  const handleSummarize = async (values: z.infer<typeof formSchema>) => {
    setIsSummarizing(true);
    setSummary('');
    setVideoId('');
    setVideoUrl('');
    setChatHistory([]);
    setTimecodedExplanations([]);
    setCurrentUrl(values.url);
    setCurrentTopic(values.topic);

    const extractedVideoId = getYouTubeVideoId(values.url);
    if (!extractedVideoId) {
      toast({
        variant: 'destructive',
        title: 'अमान्य YouTube URL',
        description: 'प्रदान गरिएको URL मा भिडियो ID फेला परेन।',
      });
      setIsSummarizing(false);
      return;
    }

    try {
      const result = await youtubeSummarization({ youtubeVideoLink: values.url, topic: values.topic, language: 'ne' });
      setVideoId(extractedVideoId);
      setVideoUrl(`https://www.youtube.com/embed/${extractedVideoId}`);
      setSummary(result.summary);
      setTimecodedExplanations(result.timecodedExplanations || []);
      setChatHistory([{ role: 'bot', content: "मैले तपाईंको विषयको आधारमा भिडियोको विश्लेषण गरेको छु। यसको बारेमा केहि सोध्नुहोस्!" }]);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'त्रुटि',
        description: 'YouTube भिडियो विश्लेषण गर्न असफल भयो।',
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
      const result = await youtubeChatbot({ youtubeVideoUrl: currentUrl, question: values.message, topic: currentTopic, language: 'ne' });
      const newAiMessage: ChatMessage = { role: 'bot', content: result.answer };
      setChatHistory(prev => [...prev, newAiMessage]);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'त्रुटि',
        description: 'च्याटबटबाट प्रतिक्रिया प्राप्त गर्न असफल भयो।',
      });
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>YouTube भिडियो विश्लेषक</CardTitle>
        <CardDescription>YouTube URL र एक विषय प्रविष्ट गर्नुहोस्। AI ले भिडियो प्रदर्शन गर्नेछ, सारांश उत्पन्न गर्नेछ, र च्याट सत्र सुरु गर्नेछ।</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSummarize)} className="space-y-4">
             <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                   <FormLabel>YouTube URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.youtube.com/watch?v=..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>विश्लेषण गर्न विषय</FormLabel>
                    <FormControl>
                        <Input placeholder="उदाहरण: न्यूटनको नियम, प्रकाश संश्लेषण" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSummarizing}>
              {isSummarizing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              <span className="ml-2">भिडियो विश्लेषण गर्नुहोस्</span>
            </Button>
          </form>
        </Form>
        
        {(isSummarizing || videoUrl) && <Separator className="my-6" />}

        {isSummarizing && (
          <div className="flex flex-col items-center justify-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">भिडियो विश्लेषण गरिँदै छ... कृपया पर्खनुहोस्।</p>
          </div>
        )}
        
        <div className="space-y-6">
            {videoUrl && !isSummarizing && (
                <div className="aspect-video w-full">
                    <iframe
                        className="w-full h-full rounded-lg"
                        src={videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            {summary && !isSummarizing && (
            <>
                <div>
                  <h3 className="text-lg font-semibold mb-2">समग्र सारांश</h3>
                  <div className="p-4 bg-muted/50 rounded-lg text-sm">{summary}</div>
                </div>

                {timecodedExplanations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 mt-4">भिडियो ब्रेकडाउन</h3>
                    <Accordion type="single" collapsible className="w-full border rounded-lg">
                      {timecodedExplanations.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index} className={index === timecodedExplanations.length - 1 ? 'border-b-0' : ''}>
                          <AccordionTrigger className="px-4 text-left hover:no-underline">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-auto px-2 py-1 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTimestampClick(item.timestamp);
                                }}
                                aria-label={`${item.timestamp} बाट प्ले गर्नुहोस्`}
                              >
                                <PlayCircle className="h-4 w-4 mr-1.5" />
                                {item.timestamp}
                              </Button>
                              <span className="font-medium">{item.title}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 text-muted-foreground">
                            {item.explanation}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 mt-4">च्याटबोट</h3>
                  <div className="border rounded-lg p-4">
                      <ScrollArea className="h-64 mb-4 pr-4">
                      <div className="space-y-4">
                          {chatHistory.map((msg, index) => (
                          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                              {msg.role === 'bot' && <Avatar className="w-8 h-8"><AvatarFallback>AI</AvatarFallback></Avatar>}
                              <p className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.role === 'bot' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                              {msg.content}
                              </p>
                              {msg.role === 'user' && <Avatar className="w-8 h-8"><AvatarFallback>तपाईं</AvatarFallback></Avatar>}
                          </div>
                          ))}
                          {isChatting && (
                              <div className="flex items-start gap-3">
                                  <Avatar className="w-8 h-8"><AvatarFallback>AI</AvatarFallback></Avatar>
                                  <p className="rounded-lg px-4 py-2 bg-muted flex items-center gap-2">
                                      <Loader2 className="h-4 w-4 animate-spin" /> सोच्दै...
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
                                  <Input placeholder="एउटा फलो-अप प्रश्न सोध्नुहोस्..." {...field} disabled={isChatting} autoComplete="off"/>
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
            </>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
