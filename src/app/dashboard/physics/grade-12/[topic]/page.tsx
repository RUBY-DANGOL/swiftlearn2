'use client'

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageCircle, HelpCircle, History, FlaskConical, Atom } from 'lucide-react';

const grade12Syllabus = [
  { unit: "Unit 1: Mechanics", topics: [{ name: "Rotational dynamics", slug: "rotational-dynamics" }, { name: "Periodic motion", slug: "periodic-motion" }, { name: "Fluid statics", slug: "fluid-statics" }] },
  { unit: "Unit 2: Heat and Thermodynamics", topics: [{ name: "First law of thermodynamics", slug: "first-law-of-thermodynamics" }, { name: "Second law of thermodynamics", slug: "second-law-of-thermodynamics" }] },
  { unit: "Unit 3: Wave and optics", topics: [{ name: "Wave motion", slug: "wave-motion" }, { name: "Mechanical waves", slug: "mechanical-waves" }, { name: "Wave in pipes and strings", slug: "wave-in-pipes-and-strings" }, { name: "Acoustic phenomena", slug: "acoustic-phenomena" }, { name: "Nature and propagation of light", slug: "nature-and-propagation-of-light" }, { name: "Interference", slug: "interference" }, { name: "Diffraction", slug: "diffraction" }, { name: "Polarization", slug: "polarization" }] },
  { unit: "Unit 4: Electricity and Magnetism", topics: [{ name: "Electrical circuits", slug: "electrical-circuits" }, { name: "Thermoelectric effects", slug: "thermoelectric-effects" }, { name: "Magnetic field", slug: "magnetic-field" }, { name: "Magnetic properties of materials", slug: "magnetic-properties-of-materials" }, { name: "Electromagnetic Induction", slug: "electromagnetic-induction" }, { name: "Alternating currents", slug: "alternating-currents" }] },
  { unit: "Unit 5: Modern physics", topics: [{ name: "Electrons", slug: "electrons" }, { name: "Photons", slug: "photons" }, { name: "Semiconductor devices", slug: "semiconductor-devices" }, { name: "Quantization of energy", slug: "quantization-of-energy" }, { name: "Radioactivity and nuclear reaction", slug: "radioactivity-and-nuclear-reaction" }, { name: "Recent trends in physics", slug: "recent-trends-in-physics" }] },
];

function findTopicName(slug: string): string {
    for (const unit of grade12Syllabus) {
        const topic = unit.topics.find(t => t.slug === slug);
        if (topic) return topic.name;
    }
    return "Physics Topic";
}

function PlaceholderContent({ title, description }: { title: string, description: string }) {
    return (
        <div className="text-center p-8 bg-muted/50 rounded-lg mt-6">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}

export default function Grade12TopicPage() {
    const params = useParams();
    const topicSlug = params.topic as string;
    const topicName = findTopicName(topicSlug);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                    <Atom className="w-8 h-8 text-primary" />
                    {topicName}
                </CardTitle>
                <CardDescription>Grade 12 Physics | Explore notes, quizzes, and more for {topicName}.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="notes" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                        <TabsTrigger value="notes" className="gap-2"><BookOpen className="h-4 w-4" /> Notes</TabsTrigger>
                        <TabsTrigger value="chatbot" className="gap-2"><MessageCircle className="h-4 w-4" /> Chatbot</TabsTrigger>
                        <TabsTrigger value="quiz" className="gap-2"><HelpCircle className="h-4 w-4" /> Quiz</TabsTrigger>
                        <TabsTrigger value="past-questions" className="gap-2"><History className="h-4 w-4" /> Past Questions</TabsTrigger>
                        <TabsTrigger value="lab" className="gap-2"><FlaskConical className="h-4 w-4" /> Lab</TabsTrigger>
                    </TabsList>
                    <TabsContent value="notes">
                        <PlaceholderContent title="Notes Coming Soon" description={`Notes for ${topicName} will be available here.`} />
                    </TabsContent>
                    <TabsContent value="chatbot">
                        <PlaceholderContent title="Chatbot Coming Soon" description={`An interactive chatbot to help you with ${topicName} will be here.`} />
                    </TabsContent>
                    <TabsContent value="quiz">
                        <PlaceholderContent title="Quiz Coming Soon" description={`Test your knowledge on ${topicName} with our upcoming quiz.`} />
                    </TabsContent>
                    <TabsContent value="past-questions">
                        <PlaceholderContent title="Past Questions Coming Soon" description={`Practice with past questions related to ${topicName}.`} />
                    </TabsContent>
                    <TabsContent value="lab">
                        <PlaceholderContent title="Virtual Lab Coming Soon" description={`Explore interactive experiments for ${topicName} in our virtual lab.`} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
