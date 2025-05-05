'use client';

import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Code, Eye } from 'lucide-react';
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
  type: string; // Keep type flexible or define specific types in JSON
}

// Fetch project data from the JSON file
const projects: Project[] = portfolioData.projects;

const ProjectsPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-12 text-primary text-center">My Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? (
            projects.map((project) => (
            <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg subtle-hover transition-all duration-300 ease-in-out hover:shadow-xl bg-card">
                <div className="relative h-48 w-full">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={project.imageHint}
                    className="bg-muted" // Background while loading
                />
                </div>
                <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground pt-1">{project.type}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                <p className="text-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground">{tag}</Badge>
                    ))}
                </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t pt-4 mt-auto">
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
                </CardFooter>
            </Card>
            ))
         ) : (
            <p className="text-center text-muted-foreground col-span-full mt-8">No projects listed yet.</p>
         )}
      </div>
    </div>
  );
};

export default ProjectsPage;
