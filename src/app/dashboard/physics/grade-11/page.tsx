import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Atom, ListTree, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const grade11Syllabus = [
  { 
    unit: "Unit 1: Mechanics", 
    topics: [
      { name: "Physical quantities", slug: "physical-quantities" },
      { name: "Vectors", slug: "vectors" },
      { name: "Kinematics", slug: "kinematics" },
      { name: "Dynamics", slug: "dynamics" },
      { name: "Work, energy and power", slug: "work-energy-and-power" },
      { name: "Circular motion", slug: "circular-motion" },
      { name: "Gravitation", slug: "gravitation" },
      { name: "Elasticity", slug: "elasticity" }
    ] 
  },
  { 
    unit: "Unit 2: Heat and Thermodynamics", 
    topics: [
      { name: "Heat and temperature", slug: "heat-and-temperature" },
      { name: "Thermal expansion", slug: "thermal-expansion" },
      { name: "Quantity of heat", slug: "quantity-of-heat" },
      { name: "Rate of heat flow", slug: "rate-of-heat-flow" },
      { name: "Ideal gas", slug: "ideal-gas" }
    ] 
  },
  { 
    unit: "Unit 3: Wave and optics", 
    topics: [
      { name: "Reflection at curved mirror", slug: "reflection-at-curved-mirror" },
      { name: "Refraction at plane surfaces", slug: "refraction-at-plane-surfaces" },
      { name: "Refraction through prisms", slug: "refraction-through-prisms" },
      { name: "Lenses", slug: "lenses" },
      { name: "Dispersion", slug: "dispersion" }
    ] 
  },
  { 
    unit: "Unit 4: Electricity and Magnetism", 
    topics: [
      { name: "Electric charges", slug: "electric-charges" },
      { name: "Electric field", slug: "electric-field" },
      { name: "Potential, potential difference and potential energy", slug: "potential-potential-difference-and-potential-energy" },
      { name: "Capacitor", slug: "capacitor" },
      { name: "DC circuits", slug: "dc-circuits" }
    ] 
  },
  { 
    unit: "Unit 5: Modern physics", 
    topics: [
      { name: "Nuclear physics", slug: "nuclear-physics" },
      { name: "Solids", slug: "solids" },
      { name: "Recent trends in physics", slug: "recent-trends-in-physics" }
    ] 
  },
];

export default function Grade11PhysicsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Atom className="w-8 h-8 text-primary" />
          Grade 11 Physics Syllabus
        </CardTitle>
        <CardDescription>An overview of the chapters and topics you will study in Grade 11 Physics.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
          <ListTree className="w-5 h-5"/>
          <span>Expand each unit and select a topic to start learning.</span>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {grade11Syllabus.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.unit}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  {item.topics.map((topic, topicIndex) => (
                    <Link
                      key={topicIndex}
                      href={`/dashboard/physics/grade-11/${topic.slug}`}
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
