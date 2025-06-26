import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dna, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BiologyPage() {
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Dna className="w-8 h-8 text-primary" />
            Biology
          </CardTitle>
          <CardDescription>Journey into the fascinating study of life and living organisms. Select your grade to begin.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/dashboard/biology/grade-11" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Grade 11</CardTitle>
              <CardDescription>
                Explore fundamental topics in botany and zoology, from biomolecules and cell biology to ecology and faunal diversity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end font-medium text-primary">
                View Syllabus <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/biology/grade-12" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Grade 12</CardTitle>
              <CardDescription>
                Delve into plant anatomy, physiology, genetics, human biology, and the applications of biotechnology.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end font-medium text-primary">
                View Syllabus <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
