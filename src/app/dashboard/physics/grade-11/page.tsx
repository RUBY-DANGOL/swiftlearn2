import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Atom, ListTree } from 'lucide-react';

const grade11Syllabus = [
  { unit: "Unit 1: Mechanics", topics: ["Physical quantities", "Vectors", "Kinematics", "Dynamics", "Work, energy and power", "Circular motion", "Gravitation", "Elasticity"] },
  { unit: "Unit 2: Heat and Thermodynamics", topics: ["Heat and temperature", "Thermal expansion", "Quantity of heat", "Rate of heat flow", "Ideal gas"] },
  { unit: "Unit 3: Wave and optics", topics: ["Reflection at curved mirror", "Refraction at plane surfaces", "Refraction through prisms", "lenses", "Dispersion"] },
  { unit: "Unit 4: Electricity and Magnetism", topics: ["Electric charges", "Electric field", "Potential, potential difference and potential energy", "Capacitor", "DC circuits"] },
  { unit: "Unit 5: Modern physics", topics: ["Nuclear physics", "Solids", "Recent trends in physics"] },
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
          <span>Expand each unit to see the detailed topics.</span>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {grade11Syllabus.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.unit}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  {item.topics.map((topic, topicIndex) => (
                    <li key={topicIndex}>{topic}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
