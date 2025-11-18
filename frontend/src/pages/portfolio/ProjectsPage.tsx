import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../../api/portfolioApi';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ExternalLink, Github } from 'lucide-react';
import { parseTagsArray } from '../../lib/utils';

export const ProjectsPage: React.FC = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground mt-2">A showcase of my work and accomplishments</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects?.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{project.type}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <p className="text-sm text-muted-foreground">{project.description}</p>

              {project.tags && (
                <div className="flex flex-wrap gap-2">
                  {parseTagsArray(project.tags).slice(0, 5).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                {project.liveUrl && (
                  <a href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline">
                      <Github className="h-4 w-4 mr-2" />
                      Source Code
                    </Button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
