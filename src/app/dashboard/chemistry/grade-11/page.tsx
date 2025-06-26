import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FlaskConical, ListTree, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const grade11ChemistrySyllabus = [
  { 
    unit: "General and Physical Chemistry", 
    topics: [
      { name: "Foundation and Fundamentals", slug: "foundation-and-fundamentals" },
      { name: "Stoichiometry", slug: "stoichiometry" },
      { name: "Atomic Structure", slug: "atomic-structure" },
      { name: "Classification of Elements and Periodic Table", slug: "classification-of-elements-and-periodic-table" },
      { name: "Chemical Bonding and Shapes of Molecules", slug: "chemical-bonding-and-shapes-of-molecules" },
      { name: "Oxidation and Reduction", slug: "oxidation-and-reduction" },
      { name: "States of Matter", slug: "states-of-matter" },
      { name: "Chemical Equilibrium", slug: "chemical-equilibrium" },
    ] 
  },
  { 
    unit: "Inorganic Chemistry", 
    topics: [
      { name: "Chemistry of Non-metals", slug: "chemistry-of-non-metals" },
      { name: "Chemistry of Metals", slug: "chemistry-of-metals" },
      { name: "Bio-inorganic Chemistry", slug: "bio-inorganic-chemistry" },
    ] 
  },
  {
    unit: "Organic Chemistry",
    topics: [
        { name: "Basic Concept of Organic Chemistry", slug: "basic-concept-of-organic-chemistry" },
        { name: "Fundamental Principles", slug: "fundamental-principles" },
        { name: "Hydrocarbons", slug: "hydrocarbons" },
        { name: "Aromatic Hydrocarbons", slug: "aromatic-hydrocarbons" },
    ]
  },
  {
    unit: "Applied Chemistry",
    topics: [
        { name: "Fundamentals of Applied Chemistry", slug: "fundamentals-of-applied-chemistry" },
        { name: "Modern Chemical Manufactures", slug: "modern-chemical-manufactures" },
    ]
  }
];

export default function Grade11ChemistryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <FlaskConical className="w-8 h-8 text-primary" />
          Grade 11 Chemistry Syllabus
        </CardTitle>
        <CardDescription>An overview of the chapters and topics you will study in Grade 11 Chemistry.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
          <ListTree className="w-5 h-5"/>
          <span>Expand each unit and select a topic to start learning.</span>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {grade11ChemistrySyllabus.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.unit}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  {item.topics.map((topic, topicIndex) => (
                    <Link
                      key={topicIndex}
                      href={`/dashboard/chemistry/grade-11/${topic.slug}`}
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
