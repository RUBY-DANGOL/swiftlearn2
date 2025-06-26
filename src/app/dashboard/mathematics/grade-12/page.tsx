import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sigma } from 'lucide-react';

export default function Grade12MathematicsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Sigma className="w-8 h-8 text-primary" />
          Grade 12 Mathematics
        </CardTitle>
        <CardDescription>Syllabus and study materials for Grade 12 Mathematics.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">The syllabus and notes for Grade 12 Mathematics will be available here shortly.</p>
        </div>
      </CardContent>
    </Card>
  );
}
