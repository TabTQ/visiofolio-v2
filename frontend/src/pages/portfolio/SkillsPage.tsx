import { useQuery } from '@tanstack/react-query';
import { getSkills } from '../../api/portfolioApi';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export const SkillsPage: React.FC = () => {
  const { data: skills, isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: () => getSkills(),
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  const categorizedSkills = {
    Technical: skills?.filter(s => s.category === 'Technical') || [],
    Tools: skills?.filter(s => s.category === 'Tools') || [],
    'Soft Skills': skills?.filter(s => s.category === 'Soft Skills') || [],
  };

  const getLevelColor = (level: number) => {
    if (level >= 67) return 'bg-green-500';
    if (level >= 34) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  const getLevelText = (level: number) => {
    if (level >= 67) return 'Proficient';
    if (level >= 34) return 'Intermediate';
    return 'Basic';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Skills & Expertise</h1>
        <p className="text-muted-foreground mt-2">My technical and professional competencies</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {Object.entries(categorizedSkills).map(([category, categorySkills]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categorySkills.map((skill) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{getLevelText(skill.level)}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getLevelColor(skill.level)}`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Proficiency Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span>Basic (1-33)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Intermediate (34-66)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Proficient (67-100)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
