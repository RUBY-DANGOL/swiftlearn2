'use client';

import { useState } from 'react';
import { Loader2, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { solveMathProblem } from '@/ai/flows/math-question-solver';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ScrollArea } from './ui/scroll-area';

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
    }
  };

  const handleSubmit = async () => {
    if (!file) {
        toast({ variant: 'destructive', title: 'No file selected', description: 'Please upload a file with a math problem.' });
        return;
    }
    setIsLoading(true);
    setSolution('');
    
    try {
      const mediaDataUri = await fileToDataUri(file);
      const result = await solveMathProblem({ mediaDataUri });
      setSolution(result.solution);
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to solve the problem. Please try again.' });
    } finally {
      setIsLoading(false);
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
    </div>
  );
}
