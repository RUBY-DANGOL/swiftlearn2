import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FlaskConical, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ChemistryPageNepali() {
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <FlaskConical className="w-8 h-8 text-primary" />
            रसायन विज्ञान
          </CardTitle>
          <CardDescription>पदार्थ र यसको रूपान्तरणका रहस्यहरू पत्ता लगाउनुहोस्। तत्वहरू र तिनीहरूको प्रतिक्रियाहरू अन्वेषण गर्न सुरु गर्न आफ्नो कक्षा चयन गर्नुहोस्।</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/dashboard-nepali/chemistry/grade-11" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">कक्षा ११</CardTitle>
              <CardDescription>
                आणविक संरचना, रासायनिक बन्धन, थर्मोडाइनामिक्स, र जैविक रसायनको आधारभूत जस्ता मौलिक अवधारणाहरू सिक्नुहोस्।
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end font-medium text-primary">
                पाठ्यक्रम हेर्नुहोस् <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard-nepali/chemistry/grade-12" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">कक्षा १२</CardTitle>
              <CardDescription>
                इलेक्ट्रोकेमिस्ट्री, रासायनिक गतिविज्ञान, समन्वय यौगिकहरू, र बायोमोलिक्युलहरू सहित उन्नत विषयहरू अन्वेषण गर्नुहोस्।
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
