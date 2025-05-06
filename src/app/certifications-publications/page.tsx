import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, FileText, ExternalLink } from 'lucide-react';
import { format, parse, isValid } from 'date-fns';
import portfolioData from '@/config/portfolio-data.json';

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
        return new Date(parsedDate.getFullYear(), parsedDate.getMonth() + 1, 0);
    }
    parsedDate = parse(cleanDateStr, 'yyyy', new Date());
     if (isValid(parsedDate)) {
        return new Date(parsedDate.getFullYear(), 11, 31);
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

const certsAndPubs = sortedAcademics.filter(item =>
    item.type.toLowerCase() === 'certification' || item.type.toLowerCase() === 'publication'
);

const AcademicIcon: FC<{ type: string }> = ({ type }) => {
  const lowerCaseType = type.toLowerCase();
  switch (lowerCaseType) {
    case 'certification':
      return <Award className="mr-2 h-5 w-5 text-accent flex-shrink-0" />;
     case 'publication':
       return <FileText className="mr-2 h-5 w-5 text-accent flex-shrink-0" />;
    default:
      return <Award className="mr-2 h-5 w-5 text-muted-foreground flex-shrink-0" />;
  }
};

const RenderAcademicItem: FC<{ item: AcademicItem }> = ({ item }) => (
    <Card key={item.id} className="shadow-lg bg-card transition-shadow duration-300 hover:shadow-xl flex flex-col mb-6">
        <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary flex items-start">
            <AcademicIcon type={item.type} />
            <span className="flex-1">{item.title}</span>
        </CardTitle>
        <CardDescription className="text-muted-foreground pt-1 pl-7">{item.institution} - {item.date}</CardDescription>
        </CardHeader>
        {item.description && (
            <CardContent className="flex-grow pl-7">
            <p className="text-foreground">{item.description}</p>
            </CardContent>
        )}
        {item.url && (
            <CardFooter className="pl-7 pt-2 mt-auto justify-start">
                <Button variant="outline" size="sm" asChild>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1 h-4 w-4" />
                    View Details / Link
                </a>
                </Button>
            </CardFooter>
        )}
         {item.description && !item.url && <div className="pb-6"></div>}
        {!item.description && !item.url && <div className="pb-6"></div>}
    </Card>
);

const CertificationsPublicationsPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-12 text-primary text-center">Certifications & Publications</h1>
      
      <div>
          <h2 className="text-2xl font-semibold mb-6 text-primary border-b pb-2">My Certifications & Publications</h2>
           {certsAndPubs.length > 0 ? (
              certsAndPubs.map((item) => <RenderAcademicItem key={item.id} item={item} />)
           ) : (
               <p className="text-muted-foreground">No certifications or publications listed.</p>
           )}
      </div>
    </div>
  );
};

export default CertificationsPublicationsPage;
