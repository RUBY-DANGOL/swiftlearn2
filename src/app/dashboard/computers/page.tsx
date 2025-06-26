import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, ArrowRight, Laptop } from 'lucide-react';
import Link from 'next/link';

export default function ComputerSciencePage() {
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Code className="w-8 h-8 text-primary" />
            Computer Science
          </CardTitle>
          <CardDescription>Build the future with algorithms, data structures, and programming. Select a category to begin.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/dashboard/computers/grade-11" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Grade 11</CardTitle>
              <CardDescription>
                Foundational concepts including computer systems, programming logic, and web technology basics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end font-medium text-primary">
                View Syllabus <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/computers/grade-12" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Grade 12</CardTitle>
              <CardDescription>
                Advanced topics such as DBMS, networking, OOP, and modern web technologies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end font-medium text-primary">
                View Syllabus <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/computers/programs" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Programs</CardTitle>
              <CardDescription>
                Explore practical programming examples, projects, and coding challenges.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex items-center justify-end font-medium text-primary">
                Explore <Laptop className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
