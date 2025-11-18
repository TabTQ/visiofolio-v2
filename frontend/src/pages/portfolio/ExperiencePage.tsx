import { useQuery } from '@tanstack/react-query';
import { getExperiences } from '../../api/portfolioApi';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { parseJsonArray } from '../../lib/utils';

export const ExperiencePage: React.FC = () => {
  const { data: experiences, isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: getExperiences,
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Work Experience</h1>
        <p className="text-muted-foreground mt-2">My professional journey and achievements</p>
      </div>

      <div className="space-y-4">
        {experiences?.map((exp) => (
          <Card key={exp.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{exp.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    <span>{exp.company}</span>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {exp.responsibilities && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Responsibilities:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {parseJsonArray(exp.responsibilities).map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}
              {exp.achievements && parseJsonArray(exp.achievements).length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Achievements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {parseJsonArray(exp.achievements).map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
