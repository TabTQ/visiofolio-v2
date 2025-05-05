import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar } from 'lucide-react';
import portfolioData from '@/config/portfolio-data.json'; // Import config data

// Define experience item structure (can potentially be moved to a types file)
interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
  achievements?: string[];
}

// Fetch experience data from the JSON file
const experiences: ExperienceItem[] = portfolioData.experiences;

const ExperiencePage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-primary text-center">Professional Experience</h1>
      <div className="space-y-8">
        {experiences.length > 0 ? (
            experiences.map((exp) => (
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
            ))
        ) : (
             <p className="text-center text-muted-foreground mt-8">No professional experience listed yet.</p>
        )}
      </div>
    </div>
  );
};

export default ExperiencePage;
