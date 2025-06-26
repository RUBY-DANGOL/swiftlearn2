import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FlaskConical, ListTree, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const grade11ChemistrySyllabus = [
  { unit: "Unit 1: Basic Concepts", topics: [{ name: "Language of Chemistry", slug: "language-of-chemistry" }, { name: "Stoichiometry", slug: "stoichiometry" }] },
  { unit: "Unit 2: Atomic Structure", topics: [{ name: "Discovery of Subatomic Particles", slug: "subatomic-particles" }, { name: "Bohr's Model", slug: "bohrs-model" }, { name: "Quantum Mechanical Model", slug: "quantum-model" }] },
  { unit: "Unit 3: Chemical Bonding", topics: [{ name: "Ionic Bonding", slug: "ionic-bonding" }, { name: "Covalent Bonding", slug: "covalent-bonding" }, { name: "VSEPR Theory", slug: "vsepr-theory" }] },
  { unit: "Unit 4: States of Matter", topics: [{ name: "Gaseous State", slug: "gaseous-state" }, { name: "Liquid State", slug: "liquid-state" }, { name: "Solid State", slug: "solid-state-basics" }] },
  { unit: "Unit 5: Thermodynamics", topics: [{ name: "First Law of Thermodynamics", slug: "first-law-thermo" }, { name: "Enthalpy", slug: "enthalpy" }, { name: "Hess's Law", slug: "hess-law" }] },
  { unit: "Unit 6: Equilibrium", topics: [{ name: "Chemical Equilibrium", slug: "chemical-equilibrium" }, { name: "Ionic Equilibrium", slug: "ionic-equilibrium" }] },
  { unit: "Unit 7: Redox Reactions", topics: [{ name: "Oxidation and Reduction", slug: "redox-reactions" }, { name: "Balancing Redox Equations", slug: "balancing-redox" }] },
  { unit: "Unit 8: Introduction to Organic Chemistry", topics: [{ name: "Nomenclature", slug: "organic-nomenclature" }, { name: "Isomerism", slug: "isomerism" }] },
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
