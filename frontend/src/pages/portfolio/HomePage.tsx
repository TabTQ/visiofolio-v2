import { useQuery } from '@tanstack/react-query';
import { getPersonalInfo } from '../../api/portfolioApi';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { data: personalInfo, isLoading } = useQuery({
    queryKey: ['personalInfo'],
    queryFn: getPersonalInfo,
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  if (!personalInfo) {
    return <div className="flex items-center justify-center h-96">No data found</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to My Portfolio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {personalInfo.profilePicture && (
              <img
                src={personalInfo.profilePicture}
                alt={personalInfo.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold">{personalInfo.name}</h2>
              <div className="flex flex-col gap-1 mt-2 text-sm text-muted-foreground">
                {personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                      {personalInfo.email}
                    </a>
                  </div>
                )}
                {personalInfo.mobile && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{personalInfo.mobile}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">{personalInfo.bio}</p>

          <div className="flex gap-4">
            {personalInfo.githubUrl && (
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
            {personalInfo.linkedinUrl && (
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
