import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FlaskConical, ListTree, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const grade12ChemistrySyllabus = [
  { 
    unit: "Physical Chemistry", 
    topics: [
      { name: "Volumetric Analysis", slug: "volumetric-analysis" },
      { name: "Ionic Equilibrium", slug: "ionic-equilibrium" },
      { name: "Chemical Kinetics", slug: "chemical-kinetics" },
      { name: "Thermodynamics", slug: "thermodynamics" },
      { name: "Electrochemistry", slug: "electrochemistry" },
    ] 
  },
  { 
    unit: "Inorganic Chemistry", 
    topics: [
      { name: "Transition Metals", slug: "transition-metals" },
      { name: "Studies of Heavy Metals", slug: "studies-of-heavy-metals" },
    ] 
  },
  {
    unit: "Organic Chemistry",
    topics: [
      { name: "Haloalkanes", slug: "haloalkanes" },
      { name: "Haloarenes", slug: "haloarenes" },
      { name: "Alcohols", slug: "alcohols" },
      { name: "Phenols", slug: "phenols" },
      { name: "Ethers", slug: "ethers" },
      { name: "Aldehydes and Ketones", slug: "aldehydes-and-ketones" },
      { name: "Carboxylic Acid and its Derivatives", slug: "carboxylic-acid-and-its-derivatives" },
      { name: "Nitro Compounds", slug: "nitro-compounds" },
      { name: "Amines", slug: "amines" },
      { name: "Organometallic Compounds", slug: "organometallic-compounds" },
    ]
  },
  {
    unit: "Applied Chemistry",
    topics: [
      { name: "Chemistry in the Service of Mankind", slug: "chemistry-in-the-service-of-mankind" },
      { name: "Cement", slug: "cement" },
      { name: "Paper and Pulp", slug: "paper-and-pulp" },
      { name: "Nuclear Chemistry and Applications of Radioactivity", slug: "nuclear-chemistry-and-applications-of-radioactivity" },
    ]
  }
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
