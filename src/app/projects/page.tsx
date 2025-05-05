'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code, Eye } from 'lucide-react';

// Define project data structure
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  type: 'Web App' | 'Mobile App' | 'Data Science' | 'Design';
}

// Sample project data
const projects: Project[] = [
  {
    id: 'proj1',
    title: 'E-commerce Platform',
    description: 'A full-featured online store with user authentication, product catalog, cart, and checkout.',
    imageUrl: 'https://picsum.photos/seed/proj1/600/400',
    imageHint: 'online store shopping cart',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    liveUrl: '#',
    repoUrl: '#',
    type: 'Web App',
  },
  {
    id: 'proj2',
    title: 'Task Management App',
    description: 'A mobile application for organizing tasks, setting reminders, and collaborating with teams.',
    imageUrl: 'https://picsum.photos/seed/proj2/600/400',
    imageHint: 'mobile app task list',
    tags: ['React Native', 'Firebase', 'TypeScript'],
    repoUrl: '#',
    type: 'Mobile App',
  },
  {
    id: 'proj3',
    title: 'Customer Churn Prediction',
    description: 'A machine learning model to predict customer churn based on usage patterns and demographics.',
    imageUrl: 'https://picsum.photos/seed/proj3/600/400',
    imageHint: 'data analysis charts graphs',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter'],
    repoUrl: '#',
    type: 'Data Science',
  },
    {
    id: 'proj4',
    title: 'Portfolio Website V1',
    description: 'Previous iteration of my personal portfolio website, built with vanilla HTML, CSS, and JS.',
    imageUrl: 'https://picsum.photos/seed/proj4/600/400',
    imageHint: 'website design code',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: '#',
    type: 'Web App',
  },
   {
    id: 'proj5',
    title: 'Brand Identity Design',
    description: 'Complete branding package including logo design, color palette, and typography for a startup.',
    imageUrl: 'https://picsum.photos/seed/proj5/600/400',
    imageHint: 'logo design branding',
    tags: ['Figma', 'Illustrator', 'Branding'],
    type: 'Design',
  },
];

const projectTypes = ['All', 'Web App', 'Mobile App', 'Data Science', 'Design'] as const;
type ProjectType = typeof projectTypes[number];


const ProjectsPage: FC = () => {
  const [filter, setFilter] = useState<ProjectType>('All');

  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.type === filter);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-primary text-center">My Projects</h1>

      <div className="mb-8 flex justify-center">
         <Select value={filter} onValueChange={(value: ProjectType) => setFilter(value)}>
          <SelectTrigger className="w-[180px] bg-card text-card-foreground shadow">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            {projectTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg subtle-hover transition-all duration-300 ease-in-out hover:shadow-xl bg-card">
            <div className="relative h-48 w-full">
              <Image
                src={project.imageUrl}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={project.imageHint}
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
        ))}
      </div>
       {filteredProjects.length === 0 && (
          <p className="text-center text-muted-foreground col-span-full mt-8">No projects found for this filter.</p>
        )}
    </div>
  );
};

export default ProjectsPage;
