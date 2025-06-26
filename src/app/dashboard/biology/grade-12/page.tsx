import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dna } from 'lucide-react';

export default function Grade12BiologyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Dna className="w-8 h-8 text-primary" />
          Grade 12 Biology
        </CardTitle>
        <CardDescription>Syllabus and content for Grade 12 Biology will be available soon.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">The Grade 12 Biology section is under construction. Please check back later!</p>
        </div>
      </CardContent>
    </Card>
  );
}
