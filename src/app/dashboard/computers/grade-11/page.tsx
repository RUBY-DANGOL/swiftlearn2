import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, ChevronRight, ListTree } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const grade11ComputerSyllabus = [
    { name: "Computer system", slug: "computer-system" },
    { name: "Number system and conversion Boolean logic", slug: "number-system-and-conversion-boolean-logic" },
    { name: "Computer software and operating system", slug: "computer-software-and-operating-system" },
    { name: "Application package", slug: "application-package" },
    { name: "Programming concepts and logics", slug: "programming-concepts-and-logics" },
    { name: "Web technology - I", slug: "web-technology-1" },
    { name: "Multimedia", slug: "multimedia" },
    { name: "Information security and cyber law", slug: "information-security-and-cyber-law" },
];

export default function Grade11ComputerPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Code className="w-8 h-8 text-primary" />
          Grade 11 Computer Science Syllabus
        </CardTitle>
        <CardDescription>An overview of the topics you will study in Grade 11 Computer Science.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
          <ListTree className="w-5 h-5"/>
          <span>Select a topic to start learning.</span>
        </div>
        <div className="flex flex-col gap-2">
          {grade11ComputerSyllabus.map((topic, index) => (
            <Link
              key={index}
              href={`/dashboard/computers/grade-11/${topic.slug}`}
              className={cn(
                "group flex items-center justify-between rounded-md p-3 text-foreground font-medium border hover:bg-muted/50 hover:text-foreground transition-colors"
              )}
            >
              <span>{topic.name}</span>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
