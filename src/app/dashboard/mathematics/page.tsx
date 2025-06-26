import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sigma } from 'lucide-react';

export default function MathematicsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Sigma className="w-8 h-8 text-primary" />
          Mathematics
        </CardTitle>
        <CardDescription>Master the language of numbers, patterns, and logic.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">Grade and chapter selection will be available here. Get ready to solve challenging problems!</p>
        </div>
      </CardContent>
    </Card>
  );
}
