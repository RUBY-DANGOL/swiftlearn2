'use client';

import { NoteExtractorNepali } from "@/components/note-extractor-nepali";
import { PdfToolNepali } from "@/components/pdf-tool-nepali";
import { YoutubeToolNepali } from "@/components/youtube-tool-nepali";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookText, FileText, Youtube } from "lucide-react"

export default function DashboardNepaliHomePage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 font-headline text-center md:text-left">अध्ययन उपकरणहरू</h1>
      <p className="text-muted-foreground mb-8 text-center md:text-left">
        YouTube भिडियोहरू सारांश गर्न, PDF कागजातहरू विश्लेषण गर्न, वा कुनै पनि लेखबाट नोटहरू प्राप्त गर्न AI को लाभ लिनुहोस्।
      </p>
      <Tabs defaultValue="youtube" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
           <TabsTrigger value="youtube" className="gap-2">
            <Youtube className="h-4 w-4" />
            YouTube विश्लेषक
          </TabsTrigger>
          <TabsTrigger value="pdf" className="gap-2">
            <FileText className="h-4 w-4" />
            PDF विश्लेषक
          </TabsTrigger>
          <TabsTrigger value="notes" className="gap-2">
            <BookText className="h-4 w-4" />
            नोट एक्सट्र्याक्टर
          </TabsTrigger>
        </TabsList>
        <TabsContent value="youtube" className="mt-6">
            <YoutubeToolNepali />
        </TabsContent>
        <TabsContent value="pdf" className="mt-6">
            <PdfToolNepali />
        </TabsContent>
        <TabsContent value="notes" className="mt-6">
            <NoteExtractorNepali />
        </TabsContent>
      </Tabs>
    </div>
  )
}
