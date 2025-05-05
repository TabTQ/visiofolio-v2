import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Award, BookOpen } from 'lucide-react'; // Minimalist line icons
import { format, parse } from 'date-fns';

interface AcademicItem {
  id: string;
  type: 'Degree' | 'Certification' | 'Coursework';
  title: string;
  institution: string;
  date: string; // Keep original date string for display
  endDate: Date; // Add a parsed Date object for sorting
  description?: string;
}

// Helper function to parse diverse date strings into Date objects
const parseDateString = (dateStr: string): Date => {
    // Attempt to parse common formats
    try {
        // Handles "Month Year" format (e.g., "May 2018", "Mar 2021")
        const parsed = parse(dateStr.replace(/^(Graduated|Issued|Completed)\s/, ''), 'MMMM yyyy', new Date());
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


// Enhanced academic data including parsed endDate
const academicsData: Omit<AcademicItem, 'endDate'>[] = [
 {
    id: 'acad1',
    type: 'Degree',
    title: 'Master of Science in Computer Science',
    institution: 'Stanford University',
    date: 'Graduated May 2018',
    description: 'Specialization in Artificial Intelligence. Thesis: "Novel Approaches to Natural Language Understanding". GPA: 3.9/4.0',
  },
  {
    id: 'acad2',
    type: 'Degree',
    title: 'Bachelor of Science in Software Engineering',
    institution: 'University of Texas at Austin',
    date: 'Graduated May 2016',
    description: 'Minor in Mathematics. Dean\'s List for 4 semesters. Capstone project: Real-time collaborative editor.',
  },
  {
    id: 'acad3',
    type: 'Certification',
    title: 'AWS Certified Solutions Architect – Associate',
    institution: 'Amazon Web Services',
    date: 'Issued Mar 2021',
    description: 'Validated technical expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.',
  },
   {
    id: 'acad4',
    type: 'Certification',
    title: 'Certified ScrumMaster (CSM)',
    institution: 'Scrum Alliance',
    date: 'Issued Aug 2019',
  },
  {
    id: 'acad5',
    type: 'Coursework',
    title: 'Advanced Machine Learning',
    institution: 'Coursera (Online)',
    date: 'Completed Feb 2020',
    description: 'Covered topics like deep learning, reinforcement learning, and graphical models.',
  },
    {
    id: 'acad6',
    type: 'Coursework',
    title: 'UI/UX Design Fundamentals',
    institution: 'Interaction Design Foundation',
    date: 'Completed Jul 2022',
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
const certifications = sortedAcademics.filter(item => item.type === 'Certification');


const AcademicIcon: FC<{ type: AcademicItem['type'] }> = ({ type }) => {
  switch (type) {
    case 'Degree':
      return <GraduationCap className="mr-2 h-5 w-5 text-accent flex-shrink-0" />;
    case 'Certification':
      return <Award className="mr-2 h-5 w-5 text-accent flex-shrink-0" />;
    case 'Coursework':
      return <BookOpen className="mr-2 h-5 w-5 text-accent flex-shrink-0" />;
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

        {/* Right Pane: Certifications */}
        <div>
            <h2 className="text-2xl font-semibold mb-6 text-primary border-b pb-2">Certifications</h2>
            {certifications.length > 0 ? (
                certifications.map((item) => <RenderAcademicItem key={item.id} item={item} />)
             ) : (
                 <p className="text-muted-foreground">No certifications listed.</p>
             )}
        </div>

      </div>
    </div>
  );
};

export default AcademicsPage;
