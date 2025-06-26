import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FlaskConical, ListTree, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const grade12ChemistrySyllabus = [
  { unit: "Unit 1: Solid State", topics: [{ name: "Classification of Solids", slug: "solid-state" }, { name: "Unit Cells and Crystal Lattices", slug: "crystal-lattices" }] },
  { unit: "Unit 2: Solutions", topics: [{ name: "Types of Solutions", slug: "solution-types" }, { name: "Colligative Properties", slug: "colligative-properties" }] },
  { unit: "Unit 3: Electrochemistry", topics: [{ name: "Electrolytic & Galvanic Cells", slug: "electrochemical-cells" }, { name: "Nernst Equation", slug: "nernst-equation" }] },
  { unit: "Unit 4: Chemical Kinetics", topics: [{ name: "Rate of Reaction", slug: "reaction-rate" }, { name: "Order of Reaction", slug: "reaction-order" }] },
  { unit: "Unit 5: Surface Chemistry", topics: [{ name: "Adsorption", slug: "adsorption" }, { name: "Colloids", slug: "colloids" }] },
  { unit: "Unit 6: p-Block Elements", topics: [{ name: "Group 15-18 Elements", slug: "p-block-elements" }] },
  { unit: "Unit 7: d- and f-Block Elements", topics: [{ name: "Transition & Inner Transition Elements", slug: "d-f-block-elements" }] },
  { unit: "Unit 8: Coordination Compounds", topics: [{ name: "Nomenclature and Isomerism", slug: "coordination-compounds" }] },
  { unit: "Unit 9: Haloalkanes and Haloarenes", topics: [{ name: "Properties and Reactions", slug: "haloalkanes-haloarenes" }] },
  { unit: "Unit 10: Alcohols, Phenols and Ethers", topics: [{ name: "Properties and Reactions", slug: "alcohols-phenols-ethers" }] },
  { unit: "Unit 11: Aldehydes, Ketones and Carboxylic Acids", topics: [{ name: "Properties and Reactions", slug: "aldehydes-ketones-acids" }] },
  { unit: "Unit 12: Amines", topics: [{ name: "Properties and Reactions", slug: "amines" }] },
  { unit: "Unit 13: Biomolecules", topics: [{ name: "Carbohydrates, Proteins, Nucleic Acids", slug: "biomolecules" }] },
  { unit: "Unit 14: Polymers", topics: [{ name: "Classification and Types", slug: "polymers" }] },
];

export default function Grade12ChemistryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <FlaskConical className="w-8 h-8 text-primary" />
          Grade 12 Chemistry Syllabus
        </CardTitle>
        <CardDescription>An overview of the chapters and topics you will study in Grade 12 Chemistry.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
          <ListTree className="w-5 h-5"/>
          <span>Expand each unit and select a topic to start learning.</span>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {grade12ChemistrySyllabus.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.unit}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  {item.topics.map((topic, topicIndex) => (
                    <Link
                      key={topicIndex}
                      href={`/dashboard/chemistry/grade-12/${topic.slug}`}
                      className="group flex items-center justify-between rounded-md p-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
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
