import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { YoutubeTool } from "@/components/youtube-tool"
import { PdfTool } from "@/components/pdf-tool"
import { NoteExtractor } from "@/components/note-extractor"
import { Youtube, FileText, BookText } from "lucide-react"

export default function DashboardHomePage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 font-headline text-center md:text-left">Study Tools</h1>
      <p className="text-muted-foreground mb-8 text-center md:text-left">
        Leverage AI to get notes from any article, summarize YouTube videos, or analyze PDF documents.
      </p>
      <Tabs defaultValue="youtube" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="youtube" className="gap-2">
            <Youtube className="h-4 w-4" />
            YouTube Analyzer
          </TabsTrigger>
          <TabsTrigger value="pdf" className="gap-2">
            <FileText className="h-4 w-4" />
            PDF Analyzer
          </TabsTrigger>
          <TabsTrigger value="notes" className="gap-2">
            <BookText className="h-4 w-4" />
            Note Extractor
          </TabsTrigger>
        </TabsList>
        <TabsContent value="youtube" className="mt-6">
            <YoutubeTool />
        </TabsContent>
        <TabsContent value="pdf" className="mt-6">
            <PdfTool />
        </TabsContent>
        <TabsContent value="notes" className="mt-6">
            <NoteExtractor />
        </TabsContent>
      </Tabs>
    </div>
  )
}
