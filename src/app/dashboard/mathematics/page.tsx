import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sigma, ArrowRight, UploadCloud } from 'lucide-react';
import Link from 'next/link';

export default function MathematicsPage() {
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Sigma className="w-8 h-8 text-primary" />
            Mathematics
          </CardTitle>
          <CardDescription>Master the language of numbers, patterns, and logic. Select a category to begin.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/dashboard/mathematics/grade-11" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Grade 11</CardTitle>
              <CardDescription>
                Explore the Grade 11 mathematics syllabus, including algebra, trigonometry, and calculus.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end font-medium text-primary">
                View Syllabus <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/mathematics/grade-12" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Grade 12</CardTitle>
              <CardDescription>
                Dive into advanced topics such as vectors, statistics, and mechanics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end font-medium text-primary">
                View Syllabus <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/mathematics/solve" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Math Solver</CardTitle>
              <CardDescription>
                Upload a picture of a math problem and get a step-by-step solution from our AI.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex items-center justify-end font-medium text-primary">
                Solve a Problem <UploadCloud className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
