'use client'

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageCircle, HelpCircle, History, Code } from 'lucide-react';
import { grade11ComputerNotesMap } from '@/lib/computer-science-notes';
import { ContextualChatbot } from '@/components/contextual-chatbot';
import { Quiz } from '@/components/quiz';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ScrollArea } from '@/components/ui/scroll-area';

const grade11ComputerSyllabus = [
    { name: "Computer system", slug: "computer-system" },
    { name: "Number system and conversion Boolean logic", slug: "number-system-and-conversion-boolean-logic" },
    { name: "Computer software and operating system", slug: "computer-software-and-operating-system" },
    { name: "Application package", slug: "application-package" },
    { name: "Programming concepts and logics", slug: "programming-concepts-and-logics" },
    { name: "Web technology - I", slug: "web-technology-1" },
    { name: "Multimedia", slug: "multimedia" },
    { name: "Information security and cyber law", slug: "information-security-and-cyber-law" },
];

function findTopicName(slug: string): string {
    const topic = grade11ComputerSyllabus.find(t => t.slug === slug);
    return topic ? topic.name : "Computer Science Topic";
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
    const topicContent = grade11ComputerNotesMap[topicSlug];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                    <Code className="w-8 h-8 text-primary" />
                    {topicName}
                </CardTitle>
                <CardDescription>Grade 11 Computer Science | Explore notes, quizzes, and more for {topicName}.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="notes" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                        <TabsTrigger value="notes" className="gap-2"><BookOpen className="h-4 w-4" /> Notes</TabsTrigger>
                        <TabsTrigger value="chatbot" className="gap-2"><MessageCircle className="h-4 w-4" /> Chatbot</TabsTrigger>
                        <TabsTrigger value="quiz" className="gap-2"><HelpCircle className="h-4 w-4" /> Quiz</TabsTrigger>
                        <TabsTrigger value="past-questions" className="gap-2"><History className="h-4 w-4" /> Past Questions</TabsTrigger>
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
                </Tabs>
            </CardContent>
        </Card>
    );
}
