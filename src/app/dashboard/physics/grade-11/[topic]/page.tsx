'use client'

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageCircle, HelpCircle, History, FlaskConical, Atom } from 'lucide-react';
import { grade11NotesMap } from '@/lib/physics-notes';
import { ContextualChatbot } from '@/components/contextual-chatbot';
import { Quiz } from '@/components/quiz';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ScrollArea } from '@/components/ui/scroll-area';
import { VernierCaliperLab } from '@/components/vernier-caliper-lab';
import { HookesLawLab } from '@/components/hookes-law-lab';
import { SimplePendulumLab } from '@/components/simple-pendulum-lab';

const grade11Syllabus = [
  { unit: "Unit 1: Mechanics", topics: [{ name: "Physical quantities", slug: "physical-quantities" }, { name: "Vectors", slug: "vectors" }, { name: "Kinematics", slug: "kinematics" }, { name: "Dynamics", slug: "dynamics" }, { name: "Work, energy and power", slug: "work-energy-and-power" }, { name: "Circular motion", slug: "circular-motion" }, { name: "Gravitation", slug: "gravitation" }, { name: "Elasticity", slug: "elasticity" }] },
  { unit: "Unit 2: Heat and Thermodynamics", topics: [{ name: "Heat and temperature", slug: "heat-and-temperature" }, { name: "Thermal expansion", slug: "thermal-expansion" }, { name: "Quantity of heat", slug: "quantity-of-heat" }, { name: "Rate of heat flow", slug: "rate-of-heat-flow" }, { name: "Ideal gas", slug: "ideal-gas" }] },
  { unit: "Unit 3: Wave and optics", topics: [{ name: "Reflection at curved mirror", slug: "reflection-at-curved-mirror" }, { name: "Refraction at plane surfaces", slug: "refraction-at-plane-surfaces" }, { name: "Refraction through prisms", slug: "refraction-through-prisms" }, { name: "Lenses", slug: "lenses" }, { name: "Dispersion", slug: "dispersion" }] },
  { unit: "Unit 4: Electricity and Magnetism", topics: [{ name: "Electric charges", slug: "electric-charges" }, { name: "Electric field", slug: "electric-field" }, { name: "Potential, potential difference and potential energy", slug: "potential-potential-difference-and-potential-energy" }, { name: "Capacitor", slug: "capacitor" }, { name: "DC circuits", slug: "dc-circuits" }] },
  { unit: "Unit 5: Modern physics", topics: [{ name: "Nuclear physics", slug: "nuclear-physics" }, { name: "Solids", slug: "solids" }, { name: "Recent trends in physics", slug: "recent-trends-in-physics" }] },
];

function findTopicName(slug: string): string {
    for (const unit of grade11Syllabus) {
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

export default function Grade11TopicPage() {
    const params = useParams();
    const topicSlug = params.topic as string;
    const topicName = findTopicName(topicSlug);
    const topicContent = grade11NotesMap[topicSlug];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                    <Atom className="w-8 h-8 text-primary" />
                    {topicName}
                </CardTitle>
                <CardDescription>Grade 11 Physics | Explore notes, quizzes, and more for {topicName}.</CardDescription>
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
                        {topicContent ? (
                            <Card className="mt-6">
                                <CardContent className="p-0">
                                    <ScrollArea className="h-[70vh] rounded-md">
                                        <div className="p-6">
                                        <ReactMarkdown
                                            className="prose prose-sm dark:prose-invert max-w-none"
                                            remarkPlugins={[remarkGfm]}
                                            rehypePlugins={[rehypeRaw]}
                                        >
                                            {topicContent.notes}
                                        </ReactMarkdown>
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        ) : (
                            <PlaceholderContent title="Notes Coming Soon" description={`Notes for ${topicName} will be available here.`} />
                        )}
                    </TabsContent>
                    
                    <TabsContent value="chatbot">
                        {topicContent ? (
                             <div className="mt-6">
                                <ContextualChatbot context={topicContent.notes} />
                            </div>
                        ) : (
                            <PlaceholderContent title="Chatbot Coming Soon" description={`An interactive chatbot to help you with ${topicName} will be here.`} />
                        )}
                    </TabsContent>

                    <TabsContent value="quiz">
                        {topicContent ? (
                            <div className="mt-6">
                                <Quiz context={topicContent.notes} numberOfQuestions={topicContent.quizQuestions} />
                            </div>
                        ) : (
                            <PlaceholderContent title="Quiz Coming Soon" description={`Test your knowledge on ${topicName} with our upcoming quiz.`} />
                        )}
                    </TabsContent>

                    <TabsContent value="past-questions">
                        <PlaceholderContent title="Past Questions Coming Soon" description={`Practice with past questions related to ${topicName}.`} />
                    </TabsContent>
                    
                    <TabsContent value="lab">
                       {topicSlug === 'physical-quantities' ? (
                            <div className="mt-6">
                                <VernierCaliperLab />
                            </div>
                        ) : topicSlug === 'elasticity' ? (
                            <div className="mt-6">
                                <HookesLawLab />
                            </div>
                        ) : topicSlug === 'gravitation' ? (
                            <div className="mt-6">
                                <SimplePendulumLab />
                            </div>
                        ) : (
                            <PlaceholderContent title="Virtual Lab Coming Soon" description={`Explore interactive experiments for ${topicName} in our virtual lab.`} />
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
