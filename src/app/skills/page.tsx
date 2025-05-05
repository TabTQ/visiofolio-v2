import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BrainCircuit, Wrench, Users, MessageSquare } from 'lucide-react'; // Minimalist line icons

interface Skill {
  id: string;
  name: string;
  level: number; // Proficiency level (0-100)
  category: 'Technical' | 'Soft Skills' | 'Tools';
}

const skills: Skill[] = [
  // Technical Skills
  { id: 'sk1', name: 'JavaScript / TypeScript', level: 95, category: 'Technical' },
  { id: 'sk2', name: 'React / Next.js', level: 90, category: 'Technical' },
  { id: 'sk3', name: 'Node.js / Express', level: 85, category: 'Technical' },
  { id: 'sk4', name: 'Python / Django', level: 75, category: 'Technical' },
  { id: 'sk5', name: 'SQL / PostgreSQL', level: 80, category: 'Technical' },
  { id: 'sk6', name: 'HTML / CSS / Tailwind', level: 95, category: 'Technical' },
  { id: 'sk7', name: 'AWS / Cloud Architecture', level: 70, category: 'Technical' },
  { id: 'sk13', name: 'Three.js / WebGL', level: 65, category: 'Technical' },


  // Tools
  { id: 'sk8', name: 'Git / GitHub', level: 90, category: 'Tools' },
  { id: 'sk9', name: 'Docker', level: 70, category: 'Tools' },
  { id: 'sk10', name: 'Figma', level: 80, category: 'Tools' },
  { id: 'sk14', name: 'Jira / Agile Tools', level: 85, category: 'Tools' },


  // Soft Skills
  { id: 'sk11', name: 'Communication', level: 90, category: 'Soft Skills' },
  { id: 'sk12', name: 'Problem Solving', level: 95, category: 'Soft Skills' },
  { id: 'sk15', name: 'Teamwork & Collaboration', level: 90, category: 'Soft Skills' },
  { id: 'sk16', name: 'Leadership & Mentoring', level: 80, category: 'Soft Skills' },
];

const SkillCategoryIcon: FC<{ category: Skill['category'] }> = ({ category }) => {
  switch (category) {
    case 'Technical':
      return <BrainCircuit className="mr-2 h-5 w-5 text-accent" />;
    case 'Tools':
      return <Wrench className="mr-2 h-5 w-5 text-accent" />;
    case 'Soft Skills':
       return <Users className="mr-2 h-5 w-5 text-accent" />; // Using Users for soft skills/collaboration
    default:
      return null;
  }
};

const SkillsPage: FC = () => {
  const technicalSkills = skills.filter((s) => s.category === 'Technical');
  const toolSkills = skills.filter((s) => s.category === 'Tools');
  const softSkills = skills.filter((s) => s.category === 'Soft Skills');

  const renderSkillCategory = (title: string, categorySkills: Skill[], icon: React.ReactNode) => (
     <Card className="shadow-lg bg-card transition-shadow duration-300 hover:shadow-xl">
        <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary flex items-center">
                {icon} {title}
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {categorySkills.map((skill) => (
            <div key={skill.id}>
                <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-foreground">{skill.name}</span>
                <span className="text-xs text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress value={skill.level} aria-label={`${skill.name} proficiency ${skill.level}%`} className="h-2 [&>div]:bg-accent" />
            </div>
            ))}
        </CardContent>
     </Card>
  );


  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-primary text-center">Skills & Proficiencies</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {renderSkillCategory('Technical Skills', technicalSkills, <BrainCircuit className="mr-2 h-5 w-5 text-accent" />)}
         {renderSkillCategory('Tools & Platforms', toolSkills, <Wrench className="mr-2 h-5 w-5 text-accent" />)}
         {renderSkillCategory('Soft Skills', softSkills, <Users className="mr-2 h-5 w-5 text-accent" />)}
      </div>
    </div>
  );
};

export default SkillsPage;
