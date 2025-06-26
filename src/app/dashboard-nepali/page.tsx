'use client';

import { NoteExtractorNepali } from "@/components/note-extractor-nepali";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookText } from "lucide-react"

export default function DashboardNepaliHomePage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 font-headline text-center md:text-left">अध्ययन उपकरणहरू</h1>
      <p className="text-muted-foreground mb-8 text-center md:text-left">
        कुनै पनि लेखबाट नोटहरू प्राप्त गर्न, YouTube भिडियोहरू संक्षेप गर्न, वा PDF कागजातहरू विश्लेषण गर्न AI को लाभ लिनुहोस्।
      </p>
      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="notes" className="gap-2">
            <BookText className="h-4 w-4" />
            नोट एक्सट्र्याक्टर
          </TabsTrigger>
        </TabsList>
        <TabsContent value="notes" className="mt-6">
            <NoteExtractorNepali />
        </TabsContent>
      </Tabs>
    </div>
  )
}
