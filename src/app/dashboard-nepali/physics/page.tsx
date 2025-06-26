import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Atom, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PhysicsPageNepali() {
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Atom className="w-8 h-8 text-primary" />
            भौतिक विज्ञान
          </CardTitle>
          <CardDescription>बल, ऊर्जा, र गतिको संसार अन्वेषण गर्नुहोस्। ब्रह्माण्डलाई नियन्त्रण गर्ने नियमहरूमा आफ्नो यात्रा सुरु गर्न आफ्नो कक्षा चयन गर्नुहोस्।</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/dashboard-nepali/physics/grade-11" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">कक्षा ११</CardTitle>
              <CardDescription>
                मेकानिक्स, गुरुत्वाकर्षण, थर्मोडाइनामिक्स, र तरंगहरू जस्ता मूल अवधारणाहरूको साथ एक बलियो आधार बनाउनुहोस्।
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end font-medium text-primary">
                पाठ्यक्रम हेर्नुहोस् <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard-nepali/physics/grade-12" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">कक्षा १२</CardTitle>
              <CardDescription>
                बिजुली, चुम्बकत्व, अप्टिक्स, र आधुनिक भौतिक विज्ञान सहित उन्नत विषयहरूमा डुब्नुहोस्।
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end font-medium text-primary">
                पाठ्यक्रम हेर्नुहोस् <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
