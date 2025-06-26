'use client';

import { useState, useEffect, useCallback } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { generateQuiz, type QuizQuestion } from '@/ai/flows/quiz-generator';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


interface QuizProps {
  context: string;
  numberOfQuestions: number;
}

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export function Quiz({ context, numberOfQuestions }: QuizProps) {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const fetchQuiz = useCallback(async () => {
    setIsLoading(true);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswerState('unanswered');
    setScore(0);
    setIsQuizFinished(false);
    
    try {
      const result = await generateQuiz({ context, numberOfQuestions });
      setQuestions(result.questions);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate the quiz. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [context, numberOfQuestions, toast]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(s => s + 1);
      setAnswerState('correct');
    } else {
      setAnswerState('incorrect');
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(i => i + 1);
        setSelectedAnswer(null);
        setAnswerState('unanswered');
      } else {
        setIsQuizFinished(true);
      }
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-center p-8 rounded-lg bg-muted/50 h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="font-semibold">Generating Your Quiz</p>
        <p className="text-muted-foreground text-sm">The AI is creating questions based on the notes. This might take a moment.</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
       <div className="flex flex-col items-center justify-center gap-4 text-center p-8 rounded-lg bg-muted/50 h-96">
        <p className="font-semibold text-destructive">Could not load quiz.</p>
        <Button onClick={fetchQuiz}><RefreshCw className="mr-2 h-4 w-4" /> Try Again</Button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <>
    <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
            <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Question {currentQuestionIndex + 1} of {questions.length}</p>
                <Progress value={progress} className="w-full"/>
            </div>
            <CardTitle>{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
            <RadioGroup
                value={selectedAnswer ?? ""}
                onValueChange={setSelectedAnswer}
                disabled={answerState !== 'unanswered'}
                className="space-y-4"
            >
                {currentQuestion.options.map((option, index) => {
                    const isCorrect = option === currentQuestion.correctAnswer;
                    const isSelected = option === selectedAnswer;
                    
                    return (
                        <Label
                            key={index}
                            htmlFor={`option-${index}`}
                            className={cn(
                                "flex items-center p-4 rounded-lg border cursor-pointer transition-colors",
                                "border-muted-foreground/50",
                                answerState !== 'unanswered' && isCorrect && "bg-green-100 dark:bg-green-900/30 border-green-500",
                                answerState === 'incorrect' && isSelected && "bg-red-100 dark:bg-red-900/30 border-red-500",
                                answerState === 'unanswered' && "hover:bg-muted/50",
                            )}
                        >
                            <RadioGroupItem value={option} id={`option-${index}`} className="mr-3" />
                            {option}
                        </Label>
                    )
                })}
            </RadioGroup>
            <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer || answerState !== 'unanswered'} className="w-full mt-6">
                Submit Answer
            </Button>
        </CardContent>
    </Card>

    <AlertDialog open={isQuizFinished}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Quiz Complete!</AlertDialogTitle>
            <AlertDialogDescription>
              Great job! You've completed the quiz.
              <div className="text-center text-2xl font-bold my-4">
                Your Score: {score} / {questions.length}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={fetchQuiz}>
                <RefreshCw className="mr-2 h-4 w-4" /> Play Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
