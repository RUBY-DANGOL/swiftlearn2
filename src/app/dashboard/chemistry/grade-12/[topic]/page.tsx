'use client'

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageCircle, HelpCircle, History, Beaker, FlaskConical } from 'lucide-react';

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

function findTopicName(slug: string): string {
    for (const unit of grade12ChemistrySyllabus) {
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

export default function Grade12TopicPage() {
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
                <CardDescription>Grade 12 Chemistry | Explore notes, quizzes, and more for {topicName}.</CardDescription>
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
