import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FlaskConical } from 'lucide-react';

export default function ChemistryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <FlaskConical className="w-8 h-8 text-primary" />
          Chemistry
        </CardTitle>
        <CardDescription>Uncover the secrets of matter and its transformations.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">Grade and chapter selection will be available here. Prepare to explore the elements and their reactions!</p>
        </div>
      </CardContent>
    </Card>
  );
}
