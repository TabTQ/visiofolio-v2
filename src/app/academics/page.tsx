import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Award, BookOpen, ExternalLink, FileText } from 'lucide-react';
import { format, parse, isValid } from 'date-fns'; // Import isValid
import portfolioData from '@/config/portfolio-data.json'; // Import config data

// Define academic item structure (can potentially be moved to a types file)
interface AcademicItemConfig {
  id: string;
  type: string; // Keep flexible from JSON
  title: string;
  institution: string;
  date: string;
  description?: string;
  url?: string;
}

interface AcademicItem extends AcademicItemConfig {
    endDate: Date; // Add a parsed Date object for sorting
}

// Helper function to parse diverse date strings into Date objects
const parseDateString = (dateStr: string): Date => {
    const cleanDateStr = dateStr.replace(/^(Graduated|Issued|Completed|Published)\s+/i, '').trim();

    // Attempt specific formats first
    let parsedDate = parse(cleanDateStr, 'MMMM yyyy', new Date());
    if (isValid(parsedDate)) {
        // Set to end of the month for consistent sorting if only month/year is given
        return new Date(parsedDate.getFullYear(), parsedDate.getMonth() + 1, 0);
    }

    // Add more parsing attempts if needed, e.g., for YYYY
    parsedDate = parse(cleanDateStr, 'yyyy', new Date());
     if (isValid(parsedDate)) {
        // Set to end of the year
        return new Date(parsedDate.getFullYear(), 11, 31);
    }

    // Fallback to epoch if parsing fails
    console.warn(`Could not parse date: ${dateStr}. Using epoch.`);
    return new Date(0);
};

// Fetch academic data from the JSON file
const academicsData: AcademicItemConfig[] = portfolioData.academics;

// Process data to add parsed dates and sort
const processAndSortAcademics = (data: AcademicItemConfig[]): AcademicItem[] => {
  return data
    .map(item => ({
      ...item,
      endDate: parseDateString(item.date),
    }))
    .sort((a, b) => b.endDate.getTime() - a.endDate.getTime()); // Sort descending
};

const sortedAcademics: AcademicItem[] = processAndSortAcademics(academicsData);

// Filter into categories based on 'type' string from JSON
const degreesAndCourses = sortedAcademics.filter(item =>
    item.type.toLowerCase() === 'degree' || item.type.toLowerCase() === 'coursework'
);
const certsAndPubs = sortedAcademics.filter(item =>
    item.type.toLowerCase() === 'certification' || item.type.toLowerCase() === 'publication'
);


const AcademicIcon: FC<{ type: string }> = ({ type }) => {
  const lowerCaseType = type.toLowerCase();
  switch (lowerCaseType) {
    case 'degree':
      return <GraduationCap className="mr-2 h-5 w-5 text-accent flex-shrink-0" />;
    case 'certification':
      return <Award className="mr-2 h-5 w-5 text-accent flex-shrink-0" />;
    case 'coursework':
      return <BookOpen className="mr-2 h-5 w-5 text-accent flex-shrink-0" />;
     case 'publication':
       return <FileText className="mr-2 h-5 w-5 text-accent flex-shrink-0" />;
    default: // Handle unexpected types gracefully
      return <GraduationCap className="mr-2 h-5 w-5 text-muted-foreground flex-shrink-0" />; // Default icon
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
                    {/* More generic link text */}
                    View Details / Link
                </a>
                </Button>
            </CardFooter>
        )}
         {/* Handle cases where there's a description but no URL */}
         {item.description && !item.url && <div className="pb-6"></div> /* Add padding to maintain consistent card height */}
        {/* Handle cases where there's no description and no URL */ }
        {!item.description && !item.url && <div className="pb-6"></div> /* Add padding */}
    </Card>
);

const AcademicsPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-12 text-primary text-center">Academics & Certifications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left Pane: Degrees & Coursework */}
        <div>
            <h2 className="text-2xl font-semibold mb-6 text-primary border-b pb-2">Academic Degrees & Coursework</h2>
             {degreesAndCourses.length > 0 ? (
                degreesAndCourses.map((item) => <RenderAcademicItem key={item.id} item={item} />)
             ) : (
                 <p className="text-muted-foreground">No academic degrees or coursework listed.</p>
             )}
        </div>

        {/* Right Pane: Certifications & Publications */}
        <div>
            <h2 className="text-2xl font-semibold mb-6 text-primary border-b pb-2">Certifications & Publications</h2>
            {certsAndPubs.length > 0 ? (
                certsAndPubs.map((item) => <RenderAcademicItem key={item.id} item={item} />)
             ) : (
                 <p className="text-muted-foreground">No certifications or publications listed.</p>
             )}
        </div>

      </div>
    </div>
  );
};

export default AcademicsPage;
