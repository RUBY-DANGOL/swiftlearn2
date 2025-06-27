'use client'

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageCircle, HelpCircle, History, FlaskConical } from 'lucide-react';

const grade11ChemistrySyllabus = [
    {
      unit: "General and Physical Chemistry",
      topics: [
        { name: "Foundation and Fundamentals", slug: "foundation-and-fundamentals" },
        { name: "Stoichiometry", slug: "stoichiometry" },
        { name: "Atomic Structure", slug: "atomic-structure" },
        { name: "Classification of Elements and Periodic Table", slug: "classification-of-elements-and-periodic-table" },
        { name: "Chemical Bonding and Shapes of Molecules", slug: "chemical-bonding-and-shapes-of-molecules" },
        { name: "Oxidation and Reduction", slug: "oxidation-and-reduction" },
        { name: "States of Matter", slug: "states-of-matter" },
        { name: "Chemical Equilibrium", slug: "chemical-equilibrium" },
      ]
    },
    {
      unit: "Inorganic Chemistry",
      topics: [
        { name: "Chemistry of Non-metals", slug: "chemistry-of-non-metals" },
        { name: "Chemistry of Metals", slug: "chemistry-of-metals" },
        { name: "Bio-inorganic Chemistry", slug: "bio-inorganic-chemistry" },
      ]
    },
    {
      unit: "Organic Chemistry",
      topics: [
          { name: "Basic Concept of Organic Chemistry", slug: "basic-concept-of-organic-chemistry" },
          { name: "Fundamental Principles", slug: "fundamental-principles" },
          { name: "Hydrocarbons", slug: "hydrocarbons" },
          { name: "Aromatic Hydrocarbons", slug: "aromatic-hydrocarbons" },
      ]
    },
    {
      unit: "Applied Chemistry",
      topics: [
          { name: "Fundamentals of Applied Chemistry", slug: "fundamentals-of-applied-chemistry" },
          { name: "Modern Chemical Manufactures", slug: "modern-chemical-manufactures" },
      ]
    }
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
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                        <TabsTrigger value="notes" className="gap-2"><BookOpen className="h-4 w-4" /> Notes</TabsTrigger>
                        <TabsTrigger value="chatbot" className="gap-2"><MessageCircle className="h-4 w-4" /> Chatbot</TabsTrigger>
                        <TabsTrigger value="quiz" className="gap-2"><HelpCircle className="h-4 w-4" /> Quiz</TabsTrigger>
                        <TabsTrigger value="past-questions" className="gap-2"><History className="h-4 w-4" /> Past Questions</TabsTrigger>
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
                </Tabs>
            </CardContent>
        </Card>
    );
}
