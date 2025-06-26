'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Loader2, Link as LinkIcon, BookText } from 'lucide-react';
import { extractNotesFromLink } from '@/ai/flows/note-extractor';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from './ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  topic: z.string().min(1, { message: 'Please enter a topic to focus on.' }),
});

export function NoteExtractor() {
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [topic, setTopic] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: '', topic: '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setNotes('');
    setUrl(values.url);
    setTopic(values.topic);
    try {
      const result = await extractNotesFromLink({ url: values.url, topic: values.topic });
      setNotes(result.notes);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to extract notes from the link. The page might be protected or not publicly accessible.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookText className="w-6 h-6" />
            AI Note Extractor
          </CardTitle>
          <CardDescription>
            Provide a link and a topic. The AI will read the content and generate structured notes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/article" {...field} disabled={isLoading} />
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
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Kinematics, Photosynthesis" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-48">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <LinkIcon className="h-4 w-4" />
                    <span className="ml-2">Extract Notes</span>
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>


      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-2 text-center p-8 rounded-lg bg-muted/50">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="font-semibold">Extracting Notes</p>
          <p className="text-muted-foreground text-sm">The AI is reading the page and generating notes on {topic}. This may take a moment.</p>
        </div>
      )}

      {notes && (
        <Card>
            <CardHeader>
                <CardTitle>Generated Notes on {topic}</CardTitle>
                <CardDescription>
                    Notes extracted from: <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">{url}</a>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[600px] rounded-md border bg-background p-4">
                    <ReactMarkdown
                    className="prose prose-sm dark:prose-invert max-w-none"
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    >
                    {notes}
                    </ReactMarkdown>
                </ScrollArea>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
