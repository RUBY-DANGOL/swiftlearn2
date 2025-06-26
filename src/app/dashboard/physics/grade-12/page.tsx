import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Atom, ListTree } from 'lucide-react';

const grade12Syllabus = [
  { unit: "Unit 1: Mechanics", topics: ["Rotational dynamics", "Periodic motion", "Fluid statics"] },
  { unit: "Unit 2: Heat and Thermodynamics", topics: ["First law of thermodynamics", "Second law of thermodynamics"] },
  { unit: "Unit 3: Wave and optics", topics: ["Wave motion", "Mechanical waves", "Wave in pipes and strings", "Acoustic phenomena", "Nature and propagation of light", "Interference", "Diffraction", "Polarization"] },
  { unit: "Unit 4: Electricity and Magnetism", topics: ["Electrical circuits", "Thermoelectric effects", "Magnetic field", "Magnetic properties of materials", "Electromagnetic Induction", "Alternating currents"] },
  { unit: "Unit 5: Modern physics", topics: ["Electrons", "Photons", "Semiconductor devices", "Quantization of energy", "Radioactivity and nuclear reaction", "Recent trends in physics"] },
];

export default function Grade12PhysicsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Atom className="w-8 h-8 text-primary" />
          Grade 12 Physics Syllabus
        </CardTitle>
        <CardDescription>An overview of the chapters and topics you will study in Grade 12 Physics.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
          <ListTree className="w-5 h-5"/>
          <span>Expand each unit to see the detailed topics.</span>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {grade12Syllabus.map((item, index) => (
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
