
'use client';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress'; 
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; 
import { BrainCircuit, Wrench, Users } from 'lucide-react';
import { cn } from "@/lib/utils"; 
import type { Skill, PortfolioData } from '@/types/portfolio-data';

const thresholds = { basic: 33, intermediate: 66, proficient: 100 };

const SkillLevelBar: FC<{ level: number }> = ({ level }) => {
  let progressBarClass = 'bg-muted'; 
  let progressValue = 0;
  let title = 'Unknown';

  if (level > 0 && level <= thresholds.basic) {
    progressBarClass = 'bg-warning'; 
    progressValue = thresholds.basic; 
    title = 'Basic';
  } else if (level > thresholds.basic && level <= thresholds.intermediate) {
    progressBarClass = 'bg-accent'; 
    progressValue = thresholds.intermediate; 
    title = 'Intermediate';
  } else if (level > thresholds.intermediate) {
    progressBarClass = 'bg-success'; 
    progressValue = thresholds.proficient; 
    title = 'Proficient';
  }

  if (level === 0) {
    title = 'No Proficiency';
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Progress
            value={progressValue} 
            className="h-3 w-full mt-1 cursor-default" 
            indicatorClassName={cn("transition-colors duration-500", progressBarClass)} 
          />
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Legend = () => (
  <div className="mb-8 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
    <span className="font-medium mr-2">Proficiency Level:</span>
    <div className="flex items-center space-x-1">
      <span className="h-3 w-3 rounded-sm bg-warning border border-border"></span>
      <span>Basic</span>
    </div>
    <div className="flex items-center space-x-1">
       <span className="h-3 w-3 rounded-sm bg-accent border border-border"></span>
      <span>Intermediate</span>
    </div>
    <div className="flex items-center space-x-1">
      <span className="h-3 w-3 rounded-sm bg-success border border-border"></span>
      <span>Proficient</span>
    </div>
  </div>
);


const SkillsPage: FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/portfolio-data');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data: PortfolioData = await response.json();
        setSkills(data.skills || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching skills data:", err);
        setError(err instanceof Error ? err.message : String(err));
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading skills...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-destructive">Error loading skills: {error}</div>;
  }

  if (!skills || skills.length === 0) {
    return <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">No skills listed yet.</div>;
  }

  const technicalSkills = skills.filter((s) => s.category.toLowerCase() === 'technical');
  const toolSkills = skills.filter((s) => s.category.toLowerCase() === 'tools');
  const softSkills = skills.filter((s) => s.category.toLowerCase() === 'soft skills');

  const renderSkillCategory = (title: string, categorySkills: Skill[], icon: React.ReactNode) => {
      if (categorySkills.length === 0) return null; 

     const sortedSkills = [...categorySkills].sort((a, b) => a.name.localeCompare(b.name));

     return (
        <Card className="shadow-lg bg-card transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center">
                    {icon} {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {sortedSkills.map((skill) => (
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
