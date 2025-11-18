import { useQuery } from '@tanstack/react-query';
import { getAcademics } from '../../api/portfolioApi';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const CertificationsPage: React.FC = () => {
  const { data: academics, isLoading } = useQuery({
    queryKey: ['certifications'],
    queryFn: () => getAcademics('Certification'),
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Certifications</h1>
        <p className="text-muted-foreground mt-2">Professional certifications and achievements</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {academics?.map((cert) => (
          <Card key={cert.id}>
            <CardHeader>
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-primary mt-1" />
                <div className="flex-1">
                  <CardTitle className="text-lg">{cert.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{cert.institution}</p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{cert.date}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {cert.description && (
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              )}
              {cert.url && cert.url !== '#' && (
                <a href={cert.url} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Certificate
                  </Button>
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
