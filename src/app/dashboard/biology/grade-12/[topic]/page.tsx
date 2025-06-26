'use client'

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageCircle, HelpCircle, History, Beaker, Dna } from 'lucide-react';

const grade12BiologySyllabus = [
    { 
      unit: "Part A: Botany", 
      topics: [
        { name: "Plant anatomy", slug: "plant-anatomy" },
        { name: "Plant physiology", slug: "plant-physiology" },
        { name: "Genetics", slug: "genetics" },
        { name: "Embryology", slug: "embryology" },
        { name: "Biotechnology", slug: "biotechnology" },
      ] 
    },
    { 
      unit: "Part B: Zoology", 
      topics: [
        { name: "Animal tissues", slug: "animal-tissues" },
        { name: "Development biology", slug: "development-biology" },
        { name: "Human biology", slug: "human-biology" },
        { name: "Human population and health disorders", slug: "human-population-and-health-disorders" },
        { name: "Applied biology", slug: "applied-biology" },
      ] 
    },
  ];

function findTopicName(slug: string): string {
    for (const unit of grade12BiologySyllabus) {
        const topic = unit.topics.find(t => t.slug === slug);
        if (topic) return topic.name;
    }
    return "Biology Topic";
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
                    <Dna className="w-8 h-8 text-primary" />
                    {topicName}
                </CardTitle>
                <CardDescription>Grade 12 Biology | Explore notes, quizzes, and more for {topicName}.</CardDescription>
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
