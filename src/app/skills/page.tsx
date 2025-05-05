import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Wrench, Users } from 'lucide-react';
import portfolioData from '@/config/portfolio-data.json'; // Import config data

// Define skill structure (can potentially be moved to a types file)
interface Skill {
  id: string;
  name: string;
  level: number; // Proficiency level (0-100)
  category: string; // Keep flexible from JSON
}

// New component for segmented skill level bar
const SkillLevelBar: FC<{ level: number }> = ({ level }) => {
  const thresholds = { basic: 33, intermediate: 66, proficient: 100 };
  const colors = {
    basic: 'bg-muted',
    intermediate: 'bg-secondary',
    proficient: 'bg-accent',
    empty: 'bg-background',
  };

  const getSegmentClass = (segment: 'basic' | 'intermediate' | 'proficient') => {
    if (segment === 'basic' && level > 0) return colors.basic;
    if (segment === 'intermediate' && level > thresholds.basic) return colors.intermediate;
    if (segment === 'proficient' && level > thresholds.intermediate) return colors.proficient;
    return colors.empty;
  };

  return (
    <div className="flex h-3 w-full rounded-full overflow-hidden border border-border mt-1">
      <div
        className={`flex-1 ${getSegmentClass('basic')} transition-colors duration-300 border-r border-border`}
        title={`Basic (${level > 0 ? 'Achieved' : 'Not Achieved'})`}
      ></div>
      <div
        className={`flex-1 ${getSegmentClass('intermediate')} transition-colors duration-300 border-r border-border`}
        title={`Intermediate (${level > thresholds.basic ? 'Achieved' : 'Not Achieved'})`}
      ></div>
       <div
        className={`flex-1 ${getSegmentClass('proficient')} transition-colors duration-300`}
        title={`Proficient (${level > thresholds.intermediate ? 'Achieved' : 'Not Achieved'})`}
       ></div>
    </div>
  );
};

// Fetch skills data from the JSON file
const skills: Skill[] = portfolioData.skills;

const SkillCategoryIcon: FC<{ category: string }> = ({ category }) => {
  const lowerCaseCategory = category.toLowerCase();
  switch (lowerCaseCategory) {
    case 'technical':
      return <BrainCircuit className="mr-2 h-5 w-5 text-accent" />;
    case 'tools':
      return <Wrench className="mr-2 h-5 w-5 text-accent" />;
    case 'soft skills': // Match the case from JSON if needed, or keep consistent
       return <Users className="mr-2 h-5 w-5 text-accent" />;
    default: // Handle unexpected categories gracefully
      return <BrainCircuit className="mr-2 h-5 w-5 text-muted-foreground" />; // Default icon
  }
};

// Legend component to explain the colors
const Legend = () => (
  <div className="mb-8 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
    <div className="flex items-center space-x-1">
      <span className="h-3 w-3 rounded-sm bg-muted border border-border"></span>
      <span>Basic</span>
    </div>
    <div className="flex items-center space-x-1">
       <span className="h-3 w-3 rounded-sm bg-secondary border border-border"></span>
      <span>Intermediate</span>
    </div>
    <div className="flex items-center space-x-1">
      <span className="h-3 w-3 rounded-sm bg-accent border border-border"></span>
      <span>Proficient</span>
    </div>
  </div>
);


const SkillsPage: FC = () => {
  // Filter skills based on category string from JSON
  const technicalSkills = skills.filter((s) => s.category.toLowerCase() === 'technical');
  const toolSkills = skills.filter((s) => s.category.toLowerCase() === 'tools');
  const softSkills = skills.filter((s) => s.category.toLowerCase() === 'soft skills');

  const renderSkillCategory = (title: string, categorySkills: Skill[], icon: React.ReactNode) => {
      if (categorySkills.length === 0) return null; // Don't render empty categories

     return (
        <Card className="shadow-lg bg-card transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center">
                    {icon} {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {categorySkills.map((skill) => (
                <div key={skill.id}>
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <SkillLevelBar level={skill.level} />
                </div>
                ))}
            </CardContent>
        </Card>
     );
  }


  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-4 text-primary text-center">Skills & Proficiencies</h1>
      <Legend />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {renderSkillCategory('Technical Skills', technicalSkills, <BrainCircuit className="mr-2 h-5 w-5 text-accent" />)}
         {renderSkillCategory('Tools & Platforms', toolSkills, <Wrench className="mr-2 h-5 w-5 text-accent" />)}
         {renderSkillCategory('Soft Skills', softSkills, <Users className="mr-2 h-5 w-5 text-accent" />)}
      </div>
       {skills.length === 0 && (
            <p className="text-center text-muted-foreground col-span-full mt-8">No skills listed yet.</p>
       )}
    </div>
  );
};

export default SkillsPage;
