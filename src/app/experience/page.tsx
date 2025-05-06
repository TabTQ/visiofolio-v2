
'use client';

import type { FC } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
      <h1 className="text-4xl font-bold mb-12 text-primary text-center">Professional Experience</h1>
      
      {experiences.length > 0 ? (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {experiences.map((exp) => (
            <AccordionItem value={exp.id} key={exp.id} className="border-b bg-card shadow-lg rounded-lg transition-shadow duration-300 hover:shadow-xl">
              <AccordionTrigger className="p-6 text-left hover:no-underline focus:no-underline">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                  <div className="flex-grow mb-3 sm:mb-0">
                    <h2 className="text-xl font-semibold text-primary flex items-center">
                      <Briefcase className="mr-2 h-5 w-5 text-accent flex-shrink-0" /> 
                      {exp.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1 pl-7">{exp.company} - {exp.location}</p>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center sm:ml-4 flex-shrink-0">
                    <Calendar className="mr-1 h-4 w-4" /> {exp.duration}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-6 pt-0">
                <div className="pl-7"> {/* Indent content to align with title text */}
                  <h3 className="font-medium text-primary mb-2 mt-2">Responsibilities:</h3>
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
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
           <p className="text-center text-muted-foreground mt-8">No professional experience listed yet.</p>
      )}
    </div>
  );
};

export default ExperiencePage;

