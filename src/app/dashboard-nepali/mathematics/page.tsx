import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sigma, ArrowRight, UploadCloud } from 'lucide-react';
import Link from 'next/link';

export default function MathematicsPageNepali() {
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Sigma className="w-8 h-8 text-primary" />
            गणित
          </CardTitle>
          <CardDescription>संख्या, ढाँचा, र तर्कको भाषामा महारत हासिल गर्नुहोस्। सुरु गर्न एक श्रेणी चयन गर्नुहोस्।</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/dashboard-nepali/mathematics/grade-11" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">कक्षा ११</CardTitle>
              <CardDescription>
                बीजगणित, त्रिकोणमिति, र क्याल्कुलस सहित कक्षा ११ को गणित पाठ्यक्रम अन्वेषण गर्नुहोस्।
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end font-medium text-primary">
                पाठ्यक्रम हेर्नुहोस् <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard-nepali/mathematics/grade-12" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">कक्षा १२</CardTitle>
              <CardDescription>
                भेक्टर, तथ्याङ्क, र मेकानिक्स जस्ता उन्नत विषयहरूमा डुब्नुहोस्।
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end font-medium text-primary">
                पाठ्यक्रम हेर्नुहोस् <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard-nepali/mathematics/solve" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">गणित समाधानकर्ता</CardTitle>
              <CardDescription>
                गणित समस्याको तस्वीर अपलोड गर्नुहोस् र हाम्रो AI बाट चरण-दर-चरण समाधान प्राप्त गर्नुहोस्।
              </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex items-center justify-end font-medium text-primary">
                समस्या समाधान गर्नुहोस् <UploadCloud className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
