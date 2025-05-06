'use client';

import type { FC } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Code, Eye, ChevronDown } from 'lucide-react';
import portfolioData from '@/config/portfolio-data.json'; // Import config data

// Define project data structure (can potentially be moved to a types file)
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  type: string;
}

// Fetch project data from the JSON file
const projects: Project[] = portfolioData.projects;

const ProjectsPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-12 text-primary text-center">My Projects</h1>

      <div className="space-y-4">
        {projects.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {projects.map((project) => (
              <AccordionItem value={project.id} key={project.id} className="border-b bg-card shadow-lg rounded-lg mb-4 transition-shadow duration-300 hover:shadow-xl">
                <AccordionTrigger className="p-6 text-left hover:no-underline focus:no-underline">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                    <div className="flex-grow mb-2 sm:mb-0">
                      <h2 className="text-xl font-semibold text-primary">{project.title}</h2>
                      <p className="text-sm text-muted-foreground mt-1">{project.type}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:ml-4">
                      {project.tags.slice(0, 3).map((tag) => ( // Show limited tags in trigger
                        <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground">{tag}</Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline">+{project.tags.length - 3} more</Badge>
                      )}
                    </div>
                  </div>
                  {/* ChevronDown is part of AccordionTrigger by default, but can be customized if needed */}
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <div className="relative h-56 w-full mb-4 rounded-md overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint={project.imageHint}
                      className="bg-muted" // Background while loading
                    />
                  </div>
                  <p className="text-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground">{tag}</Badge>
                      ))}
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    {project.liveUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Eye className="mr-1 h-4 w-4" /> Live Demo
                        </a>
                      </Button>
                    )}
                    {project.repoUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                          <Code className="mr-1 h-4 w-4" /> Source Code
                        </a>
                      </Button>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
         ) : (
            <p className="text-center text-muted-foreground col-span-full mt-8">No projects listed yet.</p>
         )}
      </div>
    </div>
  );
};

export default ProjectsPage;
