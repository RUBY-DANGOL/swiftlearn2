import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dna } from 'lucide-react';

export default function BiologyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Dna className="w-8 h-8 text-primary" />
          Biology
        </CardTitle>
        <CardDescription>Journey into the fascinating study of life and living organisms.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">Grade and chapter selection will be available here. Let's uncover the mysteries of the natural world!</p>
        </div>
      </CardContent>
    </Card>
  );
}
