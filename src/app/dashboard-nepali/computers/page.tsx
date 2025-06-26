import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, ArrowRight, Laptop } from 'lucide-react';
import Link from 'next/link';

export default function ComputerSciencePageNepali() {
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Code className="w-8 h-8 text-primary" />
            कम्प्युटर विज्ञान
          </CardTitle>
          <CardDescription>एल्गोरिदम, डेटा संरचना, र प्रोग्रामिङको साथ भविष्य निर्माण गर्नुहोस्। सुरु गर्न एक श्रेणी चयन गर्नुहोस्।</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/dashboard-nepali/computers/grade-11" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">कक्षा ११</CardTitle>
              <CardDescription>
                कम्प्युटर प्रणाली, प्रोग्रामिङ तर्क, र वेब प्रविधिको आधारभूत सहित आधारभूत अवधारणाहरू।
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end font-medium text-primary">
                पाठ्यक्रम हेर्नुहोस् <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard-nepali/computers/grade-12" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">कक्षा १२</CardTitle>
              <CardDescription>
                DBMS, नेटवर्किङ, OOP, र आधुनिक वेब प्रविधिहरू जस्ता उन्नत विषयहरू।
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end font-medium text-primary">
                पाठ्यक्रम हेर्नुहोस् <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard-nepali/computers/programs" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline text-xl">प्रोग्रामहरू</CardTitle>
              <CardDescription>
                व्यावहारिक प्रोग्रामिङ उदाहरणहरू, परियोजनाहरू, र कोडिङ चुनौतीहरू अन्वेषण गर्नुहोस्।
              </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex items-center justify-end font-medium text-primary">
                अन्वेषण गर्नुहोस् <Laptop className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
