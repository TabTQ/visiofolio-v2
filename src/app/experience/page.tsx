import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
  achievements?: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 'exp1',
    title: 'Senior Software Engineer',
    company: 'Tech Solutions Inc.',
    duration: 'Jan 2021 - Present',
    location: 'San Francisco, CA',
    responsibilities: [
      'Led the development of a new microservices architecture, improving system scalability by 40%.',
      'Mentored junior engineers, fostering a collaborative team environment.',
      'Designed and implemented key features for the flagship product using React and Node.js.',
      'Collaborated with product managers and designers to define project requirements and timelines.',
    ],
    achievements: [
      'Reduced API response times by 25% through performance optimization.',
      'Received "Employee of the Quarter" award for technical leadership.',
    ],
  },
  {
    id: 'exp2',
    title: 'Software Engineer',
    company: 'Web Innovators Co.',
    duration: 'Jun 2018 - Dec 2020',
    location: 'Austin, TX',
    responsibilities: [
      'Developed and maintained web applications using Angular and Python/Django.',
      'Participated in code reviews and contributed to improving code quality standards.',
      'Worked in an Agile team, participating in daily stand-ups, sprint planning, and retrospectives.',
      'Integrated third-party APIs for payment processing and mapping services.',
    ],
     achievements: [
      'Successfully launched three major client projects on time and within budget.',
    ],
  },
    {
    id: 'exp3',
    title: 'Junior Web Developer',
    company: 'Startup Hub',
    duration: 'May 2017 - May 2018',
    location: 'Remote',
    responsibilities: [
      'Assisted senior developers in building and testing website features.',
      'Fixed bugs and implemented enhancements for existing web applications.',
      'Gained experience with version control (Git) and deployment processes.',
    ],
  },
];

const ExperiencePage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-primary text-center">Professional Experience</h1>
      <div className="space-y-8">
        {experiences.map((exp) => (
          <Card key={exp.id} className="shadow-lg bg-card transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary flex items-center">
                 <Briefcase className="mr-2 h-5 w-5 text-accent" /> {exp.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between pt-1">
                <span>{exp.company} - {exp.location}</span>
                <span className="flex items-center mt-1 sm:mt-0">
                    <Calendar className="mr-1 h-4 w-4" /> {exp.duration}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium text-primary mb-2">Responsibilities:</h3>
              <ul className="list-disc list-inside space-y-1 text-foreground mb-4">
                {exp.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
              {exp.achievements && exp.achievements.length > 0 && (
                 <>
                    <h3 className="font-medium text-primary mb-2">Key Achievements:</h3>
                    <ul className="list-disc list-inside space-y-1 text-foreground">
                    {exp.achievements.map((ach, index) => (
                        <li key={index}>{ach}</li>
                    ))}
                    </ul>
                 </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePage;
