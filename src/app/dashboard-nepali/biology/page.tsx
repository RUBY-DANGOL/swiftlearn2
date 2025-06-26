import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dna, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BiologyPageNepali() {
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Dna className="w-8 h-8 text-primary" />
            जीव विज्ञान
          </CardTitle>
          <CardDescription>जीवन र जीवित जीवहरूको आकर्षक अध्ययनमा यात्रा गर्नुहोस्। सुरु गर्न आफ्नो कक्षा चयन गर्नुहोस्।</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/dashboard-nepali/biology/grade-11" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">कक्षा ११</CardTitle>
              <CardDescription>
                वनस्पति विज्ञान र प्राणी विज्ञानमा जैविक अणुहरू र कोशिका जीवविज्ञानदेखि पारिस्थितिकी र जीवजन्तु विविधतासम्मका आधारभूत विषयहरू अन्वेषण गर्नुहोस्।
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end font-medium text-primary">
                पाठ्यक्रम हेर्नुहोस् <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard-nepali/biology/grade-12" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">कक्षा १२</CardTitle>
              <CardDescription>
                वनस्पति शरीर रचना, शरीर विज्ञान, आनुवंशिकी, मानव जीवविज्ञान, र जैव प्रविधिको प्रयोगहरूमा डुब्नुहोस्।
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
