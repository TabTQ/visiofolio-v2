import { useQuery } from '@tanstack/react-query';
import { getAcademics } from '../../api/portfolioApi';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { GraduationCap, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const AcademicsPage: React.FC = () => {
  const { data: academics, isLoading } = useQuery({
    queryKey: ['academics'],
    queryFn: () => getAcademics(),
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  const degrees = academics?.filter(a => a.type === 'Degree') || [];
  const publications = academics?.filter(a => a.type === 'Publication') || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Academic Background</h1>
        <p className="text-muted-foreground mt-2">My educational qualifications and research</p>
      </div>

      {/* Degrees */}
      {degrees.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Degrees</h2>
          {degrees.map((academic) => (
            <Card key={academic.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{academic.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      <span>{academic.institution}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{academic.date}</span>
                  </div>
                </div>
              </CardHeader>
              {academic.description && (
                <CardContent>
                  <p className="text-sm text-muted-foreground">{academic.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Publications</h2>
          {publications.map((academic) => (
            <Card key={academic.id}>
              <CardHeader>
                <CardTitle className="text-lg">{academic.title}</CardTitle>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span>{academic.institution}</span>
                  <span>•</span>
                  <span>{academic.date}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {academic.description && (
                  <p className="text-sm text-muted-foreground">{academic.description}</p>
                )}
                {academic.url && academic.url !== '#' && (
                  <a href={academic.url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Publication
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
