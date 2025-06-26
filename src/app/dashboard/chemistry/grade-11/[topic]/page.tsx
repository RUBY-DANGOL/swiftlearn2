'use client'

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageCircle, HelpCircle, History, Beaker, FlaskConical } from 'lucide-react';

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

function findTopicName(slug: string): string {
    for (const unit of grade11ChemistrySyllabus) {
        const topic = unit.topics.find(t => t.slug === slug);
        if (topic) return topic.name;
    }
    return "Chemistry Topic";
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

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                    <FlaskConical className="w-8 h-8 text-primary" />
                    {topicName}
                </CardTitle>
                <CardDescription>Grade 11 Chemistry | Explore notes, quizzes, and more for {topicName}.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="notes" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                        <TabsTrigger value="notes" className="gap-2"><BookOpen className="h-4 w-4" /> Notes</TabsTrigger>
                        <TabsTrigger value="chatbot" className="gap-2"><MessageCircle className="h-4 w-4" /> Chatbot</TabsTrigger>
                        <TabsTrigger value="quiz" className="gap-2"><HelpCircle className="h-4 w-4" /> Quiz</TabsTrigger>
                        <TabsTrigger value="past-questions" className="gap-2"><History className="h-4 w-4" /> Past Questions</TabsTrigger>
                        <TabsTrigger value="lab" className="gap-2"><Beaker className="h-4 w-4" /> Lab</TabsTrigger>
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
