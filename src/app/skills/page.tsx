import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress'; // Import Progress
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Import Tooltip components
import { BrainCircuit, Wrench, Users } from 'lucide-react';
import portfolioData from '@/config/portfolio-data.json'; // Import config data
import { cn } from "@/lib/utils"; // Import cn for conditional classes

// Define skill structure
interface Skill {
  id: string;
  name: string;
  level: number; // Proficiency level (0-100)
  category: string;
}

// Updated component for single-color skill level bar using Progress
const SkillLevelBar: FC<{ level: number }> = ({ level }) => {
  const thresholds = { basic: 33, intermediate: 66, proficient: 100 };
  let progressBarClass = 'bg-muted'; // Default for 0%
  let title = 'No Proficiency (0%)';

  if (level > 0 && level <= thresholds.basic) {
    progressBarClass = 'bg-warning'; // Yellow for Basic
    title = `Basic (${level}%)`;
  } else if (level > thresholds.basic && level <= thresholds.intermediate) {
    progressBarClass = 'bg-accent'; // Orange for Intermediate
    title = `Intermediate (${level}%)`;
  } else if (level > thresholds.intermediate) {
    progressBarClass = 'bg-success'; // Green for Proficient
    title = `Proficient (${level}%)`;
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* Ensure Progress component itself has a defined height, default is h-4, use h-3 if desired */}
          <Progress
            value={level}
            className="h-3 w-full mt-1 cursor-default" // Added cursor-default
            indicatorClassName={cn("transition-colors duration-500", progressBarClass)} // Apply color class to indicator
          />
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Fetch skills data from the JSON file
const skills: Skill[] = portfolioData.skills;

const SkillCategoryIcon: FC<{ category: string }> = ({ category }) => {
  const lowerCaseCategory = category.toLowerCase();
  switch (lowerCaseCategory) {
    case 'technical':
      return <BrainCircuit className="mr-2 h-5 w-5 text-primary" />;
    case 'tools':
      return <Wrench className="mr-2 h-5 w-5 text-primary" />;
    case 'soft skills':
       return <Users className="mr-2 h-5 w-5 text-primary" />;
    default:
      return <BrainCircuit className="mr-2 h-5 w-5 text-muted-foreground" />;
  }
};

// Updated Legend component to explain the single bar color
const Legend = () => (
  <div className="mb-8 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
    <span className="font-medium mr-2">Proficiency Level:</span>
    <div className="flex items-center space-x-1">
      <span className="h-3 w-3 rounded-sm bg-warning border border-border"></span>
      <span>Basic (1-33%)</span>
    </div>
    <div className="flex items-center space-x-1">
       <span className="h-3 w-3 rounded-sm bg-accent border border-border"></span>
      <span>Intermediate (34-66%)</span>
    </div>
    <div className="flex items-center space-x-1">
      <span className="h-3 w-3 rounded-sm bg-success border border-border"></span>
      <span>Proficient (67-100%)</span>
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
         {renderSkillCategory('Technical Skills', technicalSkills, <BrainCircuit className="mr-2 h-5 w-5 text-primary" />)}
         {renderSkillCategory('Tools & Platforms', toolSkills, <Wrench className="mr-2 h-5 w-5 text-primary" />)}
         {renderSkillCategory('Soft Skills', softSkills, <Users className="mr-2 h-5 w-5 text-primary" />)}
      </div>
       {skills.length === 0 && (
            <p className="text-center text-muted-foreground col-span-full mt-8">No skills listed yet.</p>
       )}
    </div>
  );
};

export default SkillsPage;
