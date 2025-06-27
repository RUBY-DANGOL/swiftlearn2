'use client'

import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageCircle, HelpCircle, History, Beaker, Dna, Loader2 } from 'lucide-react';
import { grade12BiologyNotesMap } from '@/lib/biology-notes';
import { ContextualChatbot } from '@/components/contextual-chatbot';
import { Quiz } from '@/components/quiz';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ScrollArea } from '@/components/ui/scroll-area';

const InteractiveSkeletonLab = dynamic(
    () => import('@/components/human-skeleton-lab').then((mod) => mod.InteractiveSkeletonLab),
    {
        ssr: false,
        loading: () => (
            <div className="mt-6 flex h-[500px] items-center justify-center rounded-lg bg-muted/50">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span>Loading 3D Lab...</span>
                </div>
            </div>
        ),
    }
);


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
    const topicContent = grade12BiologyNotesMap[topicSlug];

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
                        {topicSlug === 'human-biology' ? (
                            <div className="mt-6">
                                <InteractiveSkeletonLab />
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
