import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dna, ListTree, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const grade12BiologySyllabus = [
  { 
    unit: "Part A: Botany", 
    topics: [
      { name: "Plant anatomy", slug: "plant-anatomy" },
      { name: "Plant physiology", slug: "plant-physiology" },
      { name: "Genetics", slug: "genetics" },
      { name: "Embryology", slug: "embryology" },
      { name: "Biotechnology", slug: "biotechnology" },
    ] 
  },
  { 
    unit: "Part B: Zoology", 
    topics: [
      { name: "Animal tissues", slug: "animal-tissues" },
      { name: "Development biology", slug: "development-biology" },
      { name: "Human biology", slug: "human-biology" },
      { name: "Human population and health disorders", slug: "human-population-and-health-disorders" },
      { name: "Applied biology", slug: "applied-biology" },
    ] 
  },
];

export default function Grade12BiologyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Dna className="w-8 h-8 text-primary" />
          Grade 12 Biology Syllabus
        </CardTitle>
        <CardDescription>An overview of the chapters and topics you will study in Grade 12 Biology.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
          <ListTree className="w-5 h-5"/>
          <span>Expand each unit and select a topic to start learning.</span>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {grade12BiologySyllabus.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.unit}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  {item.topics.map((topic, topicIndex) => (
                    <Link
                      key={topicIndex}
                      href={`/dashboard/biology/grade-12/${topic.slug}`}
                      className={cn(
                        "group flex items-center justify-between rounded-md p-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      <span>{topic.name}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
