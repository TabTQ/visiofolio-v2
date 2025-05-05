import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Import Button
import { GraduationCap, Award, BookOpen, ExternalLink, FileText } from 'lucide-react'; // Added FileText and ExternalLink
import { format, parse } from 'date-fns';

interface AcademicItem {
  id: string;
  type: 'Degree' | 'Certification' | 'Coursework' | 'Publication'; // Added Publication
  title: string;
  institution: string; // Or Publisher for publications
  date: string; // Keep original date string for display
  endDate: Date; // Add a parsed Date object for sorting
  description?: string;
  url?: string; // Optional URL for certificate/link
}

// Helper function to parse diverse date strings into Date objects
const parseDateString = (dateStr: string): Date => {
    // Attempt to parse common formats
    try {
        // Handles "Month Year" format (e.g., "May 2018", "Mar 2021", "Published Oct 2020")
        const parsed = parse(dateStr.replace(/^(Graduated|Issued|Completed|Published)\s/, ''), 'MMMM yyyy', new Date());
        if (!isNaN(parsed.getTime())) {
            // Set to end of the month for consistent sorting if only month/year is given
            const endOfMonth = new Date(parsed.getFullYear(), parsed.getMonth() + 1, 0);
            return endOfMonth;
        }
    } catch (e) {
        // Fallback or further parsing attempts if needed
        console.warn(`Could not parse date: ${dateStr}. Using epoch.`);
    }
    // Fallback to a very old date if parsing fails, adjust as needed
    return new Date(0);
};


// Enhanced academic data including parsed endDate and optional URLs
const academicsData: Omit<AcademicItem, 'endDate'>[] = [
 {
    id: 'acad1',
    type: 'Degree',
    title: 'Master of Science in Computer Science',
    institution: 'Stanford University',
    date: 'Graduated May 2018',
    description: 'Specialization in Artificial Intelligence. Thesis: "Novel Approaches to Natural Language Understanding". GPA: 3.9/4.0',
    url: '#', // Placeholder link
  },
  {
    id: 'acad2',
    type: 'Degree',
    title: 'Bachelor of Science in Software Engineering',
    institution: 'University of Texas at Austin',
    date: 'Graduated May 2016',
    description: 'Minor in Mathematics. Dean\'s List for 4 semesters. Capstone project: Real-time collaborative editor.',
     url: '#', // Placeholder link
  },
  {
    id: 'acad3',
    type: 'Certification',
    title: 'AWS Certified Solutions Architect – Associate',
    institution: 'Amazon Web Services',
    date: 'Issued Mar 2021',
    description: 'Validated technical expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.',
    url: '#', // Placeholder link
  },
   {
    id: 'acad4',
    type: 'Certification',
    title: 'Certified ScrumMaster (CSM)',
    institution: 'Scrum Alliance',
    date: 'Issued Aug 2019',
    url: '#', // Placeholder link
  },
  {
    id: 'acad5',
    type: 'Coursework',
    title: 'Advanced Machine Learning',
    institution: 'Coursera (Online)',
    date: 'Completed Feb 2020',
    description: 'Covered topics like deep learning, reinforcement learning, and graphical models.',
    // No URL needed for coursework typically
  },
    {
    id: 'acad6',
    type: 'Coursework',
    title: 'UI/UX Design Fundamentals',
    institution: 'Interaction Design Foundation',
    date: 'Completed Jul 2022',
    // No URL needed for coursework typically
  },
   {
    id: 'pub1',
    type: 'Publication',
    title: 'Scalable Microservices on AWS',
    institution: 'ACM Transactions on the Web', // Publisher
    date: 'Published Oct 2020',
    description: 'Co-authored paper detailing best practices for designing and deploying large-scale microservice systems using AWS.',
    url: '#', // Placeholder link
  },
    {
    id: 'pub2',
    type: 'Publication',
    title: 'React Performance Optimization Techniques',
    institution: 'Smashing Magazine (Online)', // Publisher
    date: 'Published Apr 2022',
    description: 'Article covering advanced techniques for optimizing React application performance.',
    url: '#', // Placeholder link
  },
];

// Process data to add parsed dates and sort
const processAndSortAcademics = (data: Omit<AcademicItem, 'endDate'>[]): AcademicItem[] => {
  return data
    .map(item => ({
      ...item,
      endDate: parseDateString(item.date),
    }))
    .sort((a, b) => b.endDate.getTime() - a.endDate.getTime()); // Sort descending
};

const sortedAcademics: AcademicItem[] = processAndSortAcademics(academicsData);

// Filter into categories
const degreesAndCourses = sortedAcademics.filter(item => item.type === 'Degree' || item.type === 'Coursework');
const certsAndPubs = sortedAcademics.filter(item => item.type === 'Certification' || item.type === 'Publication'); // Updated filter


const AcademicIcon: FC<{ type: AcademicItem['type'] }> = ({ type }) => {
  switch (type) {
    case 'Degree':
      return <GraduationCap className="mr-2 h-5 w-5 text-accent flex-shrink-0" />;
    case 'Certification':
      return <Award className="mr-2 h-5 w-5 text-accent flex-shrink-0" />;
    case 'Coursework':
      return <BookOpen className="mr-2 h-5 w-5 text-accent flex-shrink-0" />;
     case 'Publication': // Added Publication icon
       return <FileText className="mr-2 h-5 w-5 text-accent flex-shrink-0" />;
    default:
      return null;
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
        {/* Add CardFooter with link button if URL exists */}
        {item.url && (
            <CardFooter className="pl-7 pt-2 mt-auto justify-start"> {/* Adjust padding/margin */}
                <Button variant="outline" size="sm" asChild>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1 h-4 w-4" />
                    View {item.type === 'Degree' ? 'Transcript/Details' : item.type === 'Certification' ? 'Certificate' : 'Link'} {/* Dynamic text */}
                </a>
                </Button>
            </CardFooter>
        )}
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
            {/* Updated title */}
            <h2 className="text-2xl font-semibold mb-6 text-primary border-b pb-2">Certifications & Publications</h2>
            {certsAndPubs.length > 0 ? ( // Use updated filtered data
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
