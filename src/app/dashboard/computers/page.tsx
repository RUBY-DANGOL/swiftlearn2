import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code } from 'lucide-react';

export default function ComputerSciencePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Code className="w-8 h-8 text-primary" />
          Computer Science
        </CardTitle>
        <CardDescription>Build the future with algorithms, data structures, and programming.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">Grade and chapter selection will be available here. Prepare to write code and build amazing things!</p>
        </div>
      </CardContent>
    </Card>
  );
}
