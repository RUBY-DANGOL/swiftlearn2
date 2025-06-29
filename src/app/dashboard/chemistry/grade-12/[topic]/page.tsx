'use client'

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageCircle, HelpCircle, History, FlaskConical } from 'lucide-react';

const grade12ChemistrySyllabus = [
  { 
    unit: "Physical Chemistry", 
    topics: [
      { name: "Volumetric Analysis", slug: "volumetric-analysis" },
      { name: "Ionic Equilibrium", slug: "ionic-equilibrium" },
      { name: "Chemical Kinetics", slug: "chemical-kinetics" },
      { name: "Thermodynamics", slug: "thermodynamics" },
      { name: "Electrochemistry", slug: "electrochemistry" },
    ] 
  },
  { 
    unit: "Inorganic Chemistry", 
    topics: [
      { name: "Transition Metals", slug: "transition-metals" },
      { name: "Studies of Heavy Metals", slug: "studies-of-heavy-metals" },
    ] 
  },
  {
    unit: "Organic Chemistry",
    topics: [
      { name: "Haloalkanes", slug: "haloalkanes" },
      { name: "Haloarenes", slug: "haloarenes" },
      { name: "Alcohols", slug: "alcohols" },
      { name: "Phenols", slug: "phenols" },
      { name: "Ethers", slug: "ethers" },
      { name: "Aldehydes and Ketones", slug: "aldehydes-and-ketones" },
      { name: "Carboxylic Acid and its Derivatives", slug: "carboxylic-acid-and-its-derivatives" },
      { name: "Nitro Compounds", slug: "nitro-compounds" },
      { name: "Amines", slug: "amines" },
      { name: "Organometallic Compounds", slug: "organometallic-compounds" },
    ]
  },
  {
    unit: "Applied Chemistry",
    topics: [
      { name: "Chemistry in the Service of Mankind", slug: "chemistry-in-the-service-of-mankind" },
      { name: "Cement", slug: "cement" },
      { name: "Paper and Pulp", slug: "paper-and-pulp" },
      { name: "Nuclear Chemistry and Applications of Radioactivity", slug: "nuclear-chemistry-and-applications-of-radioactivity" },
    ]
  }
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
