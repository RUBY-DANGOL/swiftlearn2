'use client';

import { useState } from 'react';
import { Loader2, UploadCloud, Youtube, ArrowUpRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { solveMathProblem } from '@/ai/flows/math-question-solver';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ScrollArea } from './ui/scroll-area';
import { suggestVideos, type VideoSuggestion } from '@/ai/flows/video-suggester';

const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
};

export function MathSolver() {
  const { toast } = useToast();
  const [solution, setSolution] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  const [mathTopic, setMathTopic] = useState('');
  const [videoSuggestions, setVideoSuggestions] = useState<VideoSuggestion[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
        if (!['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].includes(selectedFile.type)) {
            toast({
              variant: 'destructive',
              title: 'Invalid File Type',
              description: 'Please upload a PDF, JPG, PNG, or WEBP file.',
            });
            return;
        }
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setSolution('');
        setMathTopic('');
        setVideoSuggestions([]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
        toast({ variant: 'destructive', title: 'No file selected', description: 'Please upload a file with a math problem.' });
        return;
    }
    setIsLoading(true);
    setSolution('');
    setMathTopic('');
    setVideoSuggestions([]);
    
    try {
      const mediaDataUri = await fileToDataUri(file);
      const result = await solveMathProblem({ mediaDataUri });
      setSolution(result.solution);
      setMathTopic(result.topic);
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to solve the problem. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestVideos = async () => {
    if (!mathTopic) return;
    setIsSuggesting(true);
    setVideoSuggestions([]);
    try {
      const result = await suggestVideos({ topic: mathTopic });
      setVideoSuggestions(result.suggestions);
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to suggest videos. Please try again.' });
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Math Problem Solver</CardTitle>
          <CardDescription>Upload an image (JPG, PNG) or a PDF of a math problem, and the AI will provide a step-by-step solution.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Input id="file-upload" type="file" accept="application/pdf,image/jpeg,image/png,image/webp" onChange={handleFileChange} disabled={isLoading} className="flex-grow" />
            <Button onClick={handleSubmit} disabled={isLoading || !file} className="w-full sm:w-auto">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
              Solve Problem
            </Button>
          </div>
           {fileName && <p className="text-xs text-muted-foreground mt-2">Selected file: {fileName}</p>}
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-2 text-center p-8 rounded-lg bg-muted/50">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="font-semibold">Solving the problem...</p>
          <p className="text-muted-foreground text-sm">The AI is analyzing your document. This may take a moment.</p>
        </div>
      )}

      {solution && (
        <Card>
          <CardHeader>
            <CardTitle>Solution</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] rounded-md border bg-background p-4">
              <ReactMarkdown
                className="prose prose-sm dark:prose-invert max-w-none"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {solution}
              </ReactMarkdown>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {solution && mathTopic && (
        <Card>
            <CardHeader>
                <CardTitle>Need more help with "{mathTopic}"?</CardTitle>
                <CardDescription>Click the button below to get AI-suggested YouTube tutorials for this topic.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleSuggestVideos} disabled={isSuggesting}>
                    {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Youtube className="mr-2 h-4 w-4" />}
                    Suggest Videos
                </Button>

                {isSuggesting && (
                    <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Finding the best videos for you...
                    </div>
                )}

                {videoSuggestions.length > 0 && (
                    <div className="mt-6 space-y-4">
                        <h4 className="font-semibold">Recommended Tutorials:</h4>
                        <ul className="space-y-3">
                            {videoSuggestions.map((suggestion, index) => (
                                <li key={index}>
                                    <a
                                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(suggestion.searchQuery)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start gap-3 border p-4 rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <Youtube className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                                        <div className="flex-grow">
                                            <p className="font-bold text-primary">{suggestion.title}</p>
                                            <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                                        </div>
                                        <ArrowUpRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
      )}

    </div>
  );
}
