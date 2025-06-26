import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Laptop } from 'lucide-react';

export default function ComputerProgramsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Laptop className="w-8 h-8 text-primary" />
          Programming Examples & Projects
        </CardTitle>
        <CardDescription>Explore practical code, from simple algorithms to complete projects.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">This section will feature practical code examples, projects, and tutorials. Get ready to build!</p>
        </div>
      </CardContent>
    </Card>
  );
}
