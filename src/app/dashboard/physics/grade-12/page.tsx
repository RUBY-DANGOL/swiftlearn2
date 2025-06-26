import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Atom, ListTree, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const grade12Syllabus = [
  { 
    unit: "Unit 1: Mechanics", 
    topics: [
      { name: "Rotational dynamics", slug: "rotational-dynamics" },
      { name: "Periodic motion", slug: "periodic-motion" },
      { name: "Fluid statics", slug: "fluid-statics" }
    ] 
  },
  { 
    unit: "Unit 2: Heat and Thermodynamics", 
    topics: [
      { name: "First law of thermodynamics", slug: "first-law-of-thermodynamics" },
      { name: "Second law of thermodynamics", slug: "second-law-of-thermodynamics" }
    ] 
  },
  { 
    unit: "Unit 3: Wave and optics", 
    topics: [
      { name: "Wave motion", slug: "wave-motion" },
      { name: "Mechanical waves", slug: "mechanical-waves" },
      { name: "Wave in pipes and strings", slug: "wave-in-pipes-and-strings" },
      { name: "Acoustic phenomena", slug: "acoustic-phenomena" },
      { name: "Nature and propagation of light", slug: "nature-and-propagation-of-light" },
      { name: "Interference", slug: "interference" },
      { name: "Diffraction", slug: "diffraction" },
      { name: "Polarization", slug: "polarization" }
    ] 
  },
  { 
    unit: "Unit 4: Electricity and Magnetism", 
    topics: [
      { name: "Electrical circuits", slug: "electrical-circuits" },
      { name: "Thermoelectric effects", slug: "thermoelectric-effects" },
      { name: "Magnetic field", slug: "magnetic-field" },
      { name: "Magnetic properties of materials", slug: "magnetic-properties-of-materials" },
      { name: "Electromagnetic Induction", slug: "electromagnetic-induction" },
      { name: "Alternating currents", slug: "alternating-currents" }
    ] 
  },
  { 
    unit: "Unit 5: Modern physics", 
    topics: [
      { name: "Electrons", slug: "electrons" },
      { name: "Photons", slug: "photons" },
      { name: "Semiconductor devices", slug: "semiconductor-devices" },
      { name: "Quantization of energy", slug: "quantization-of-energy" },
      { name: "Radioactivity and nuclear reaction", slug: "radioactivity-and-nuclear-reaction" },
      { name: "Recent trends in physics", slug: "recent-trends-in-physics" }
    ] 
  },
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
          <span>Expand each unit and select a topic to start learning.</span>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {grade12Syllabus.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.unit}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  {item.topics.map((topic, topicIndex) => (
                    <Link
                      key={topicIndex}
                      href={`/dashboard/physics/grade-12/${topic.slug}`}
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
