import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Award, BookOpen } from 'lucide-react'; // Minimalist line icons

interface AcademicItem {
  id: string;
  type: 'Degree' | 'Certification' | 'Coursework';
  title: string;
  institution: string;
  date: string;
  description?: string;
}

const academics: AcademicItem[] = [
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

const AcademicIcon: FC<{ type: AcademicItem['type'] }> = ({ type }) => {
  switch (type) {
    case 'Degree':
      return <GraduationCap className="mr-2 h-5 w-5 text-accent" />;
    case 'Certification':
      return <Award className="mr-2 h-5 w-5 text-accent" />;
    case 'Coursework':
      return <BookOpen className="mr-2 h-5 w-5 text-accent" />;
    default:
      return null;
  }
};

const AcademicsPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 page-load-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-primary text-center">Academic Background</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {academics.map((item) => (
          <Card key={item.id} className="shadow-lg bg-card transition-shadow duration-300 hover:shadow-xl flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary flex items-center">
                <AcademicIcon type={item.type} /> {item.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground pt-1">{item.institution} - {item.date}</CardDescription>
            </CardHeader>
            {item.description && (
                <CardContent className="flex-grow">
                <p className="text-foreground">{item.description}</p>
                </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AcademicsPage;
