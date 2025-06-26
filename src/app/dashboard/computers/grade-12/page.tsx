import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, ChevronRight, ListTree } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const grade12ComputerSyllabus = [
    { name: "DBMS Concept", slug: "dbms-concept" },
    { name: "Concept of Network and data communication", slug: "concept-of-network-and-data-communication" },
    { name: "Web technology - II (CSS, Javascript, PHP)", slug: "web-technology-2" },
    { name: "Programming II", slug: "programming-2" },
    { name: "OOP concept", slug: "oop-concept" },
    { name: "Software process model", slug: "software-process-model" },
    { name: "Recent trends in ICT", slug: "recent-trends-in-ict" },
];

export default function Grade12ComputerPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Code className="w-8 h-8 text-primary" />
          Grade 12 Computer Science Syllabus
        </CardTitle>
        <CardDescription>An overview of the topics you will study in Grade 12 Computer Science.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
          <ListTree className="w-5 h-5"/>
          <span>Select a topic to start learning.</span>
        </div>
        <div className="flex flex-col gap-2">
          {grade12ComputerSyllabus.map((topic, index) => (
            <Link
              key={index}
              href={`/dashboard/computers/grade-12/${topic.slug}`}
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
