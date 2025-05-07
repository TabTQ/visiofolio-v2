
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen, ExternalLink, FileText } from 'lucide-react';
import { parse, isValid } from 'date-fns';
import portfolioData from '@/config/portfolio-data.json';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AcademicItemConfig {
  id: string;
  type: string;
  title: string;
  institution: string;
  date: string;
  description?: string;
  url?: string;
}

interface AcademicItem extends AcademicItemConfig {
    endDate: Date;
}

const parseDateString = (dateStr: string): Date => {
    const cleanDateStr = dateStr.replace(/^(Graduated|Issued|Completed|Published)\s+/i, '').trim();
    let parsedDate = parse(cleanDateStr, 'MMMM yyyy', new Date());
    if (isValid(parsedDate)) {
        return new Date(parsedDate.getFullYear(), parsedDate.getMonth() + 1, 0); // End of the month
    }
    parsedDate = parse(cleanDateStr, 'yyyy', new Date());
     if (isValid(parsedDate)) {
        return new Date(parsedDate.getFullYear(), 11, 31); // End of the year
    }
    console.warn(`Could not parse date: ${dateStr}. Using epoch.`);
    return new Date(0);
};

const academicsData: AcademicItemConfig[] = portfolioData.academics;

const processAndSortAcademics = (data: AcademicItemConfig[]): AcademicItem[] => {
  return data
    .map(item => ({
      ...item,
      endDate: parseDateString(item.date),
    }))
    .sort((a, b) => b.endDate.getTime() - a.endDate.getTime());
};

const sortedAcademics: AcademicItem[] = processAndSortAcademics(academicsData);

const degreesAndCourses = sortedAcademics.filter(item =>
    item.type.toLowerCase() === 'degree' || item.type.toLowerCase() === 'coursework'
);

const publicationsData = sortedAcademics.filter(item =>
    item.type.toLowerCase() === 'publication'
);

const AcademicIcon: FC<{ type: string }> = ({ type }) => {
  const lowerCaseType = type.toLowerCase();
  switch (lowerCaseType) {
    case 'degree':
      return <GraduationCap className="mr-2 h-5 w-5 text-accent flex-shrink-0" />;
    case 'coursework':
      return <BookOpen className="mr-2 h-5 w-5 text-accent flex-shrink-0" />;
    case 'publication':
      return <FileText className="mr-2 h-5 w-5 text-accent flex-shrink-0" />;
    default:
      return <GraduationCap className="mr-2 h-5 w-5 text-muted-foreground flex-shrink-0" />;
  }
};

const RenderAcademicItem: FC<{ item: AcademicItem }> = ({ item }) => (
    <AccordionItem value={item.id} key={item.id} className="border-b bg-card shadow-lg rounded-lg transition-shadow duration-300 hover:shadow-xl">
        <AccordionTrigger className="p-6 text-left hover:no-underline focus:no-underline">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                <div className="flex-grow mb-2 sm:mb-0">
                    <h2 className="text-xl font-semibold text-primary flex items-start">
                        <AcademicIcon type={item.type} />
                        <span className="flex-1">{item.title}</span>
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1 pl-7">{item.institution} - {item.date}</p>
                </div>
            </div>
        </AccordionTrigger>
        <AccordionContent className="p-6 pt-0">
            <div className="pl-7">
                {item.description && (
                    <p className="text-foreground mb-4">{item.description}</p>
                )}
                {item.url && (
                    <div className="flex justify-start mt-4">
                        <Button variant="outline" size="sm" asChild>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-1 h-4 w-4" />
                            View Details / Link
                        </a>
                        </Button>
                    </div>
                )}
            </div>
        </AccordionContent>
    </AccordionItem>
);

const AcademicsPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-12 text-primary text-center">Academics</h1>
      
      <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary border-b pb-2">Academic Degrees & Coursework</h2>
           {degreesAndCourses.length > 0 ? (
              <Accordion type="single" collapsible className="w-full space-y-4">
                {degreesAndCourses.map((item) => <RenderAcademicItem key={item.id} item={item} />)}
              </Accordion>
           ) : (
               <p className="text-muted-foreground">No academic degrees or coursework listed.</p>
           )}
      </div>

      <div>
          <h2 className="text-2xl font-semibold mb-6 text-primary border-b pb-2">Publications</h2>
           {publicationsData.length > 0 ? (
              <Accordion type="single" collapsible className="w-full space-y-4">
                {publicationsData.map((item) => <RenderAcademicItem key={item.id} item={item} />)}
              </Accordion>
           ) : (
               <p className="text-muted-foreground">No publications listed.</p>
           )}
      </div>
    </div>
  );
};

export default AcademicsPage;
