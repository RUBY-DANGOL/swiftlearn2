import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dna, ListTree, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const grade11BiologySyllabus = [
  { 
    unit: "Part A: Botany (64 Hours)", 
    topics: [
      { name: "Biomolecules and cell biology", slug: "biomolecules-and-cell-biology" },
      { name: "Floral diversity", slug: "floral-diversity" },
      { name: "Introductory microbiology", slug: "introductory-microbiology" },
      { name: "Ecology", slug: "ecology" },
      { name: "Vegetation", slug: "vegetation" },
    ] 
  },
  { 
    unit: "Part B: Zoology (64 Hours)", 
    topics: [
      { name: "Introduction to biology", slug: "introduction-to-biology" },
      { name: "Evolutionary biology", slug: "evolutionary-biology" },
      { name: "Faunal diversity", slug: "faunal-diversity" },
      { name: "Biota and environment", slug: "biota-and-environment" },
      { name: "Conservation biology", slug: "conservation-biology" },
    ] 
  },
];

export default function Grade11BiologyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Dna className="w-8 h-8 text-primary" />
          Grade 11 Biology Syllabus
        </CardTitle>
        <CardDescription>An overview of the chapters and topics you will study in Grade 11 Biology.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
          <ListTree className="w-5 h-5"/>
          <span>Expand each unit and select a topic to start learning.</span>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {grade11BiologySyllabus.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.unit}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  {item.topics.map((topic, topicIndex) => (
                    <Link
                      key={topicIndex}
                      href={`/dashboard/biology/grade-11/${topic.slug}`}
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
