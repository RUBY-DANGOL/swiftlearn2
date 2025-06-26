import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Atom, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PhysicsPage() {
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Atom className="w-8 h-8 text-primary" />
            Physics
          </CardTitle>
          <CardDescription>Explore the world of forces, energy, and motion. Select your grade to begin your journey into the laws that govern the universe.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/dashboard/physics/grade-11" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Grade 11</CardTitle>
              <CardDescription>
                Build a strong foundation with core concepts like mechanics, gravitation, thermodynamics, and waves.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end font-medium text-primary">
                View Syllabus <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/physics/grade-12" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Grade 12</CardTitle>
              <CardDescription>
                Dive into advanced topics including electricity, magnetism, optics, and modern physics.
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
