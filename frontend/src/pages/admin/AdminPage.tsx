import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProjects,
  getExperiences,
  getAcademics,
  getSkills,
  deleteProject,
  deleteExperience,
  deleteAcademic,
  deleteSkill,
  createProject,
  createExperience,
  createAcademic,
  createSkill,
} from '../../api/portfolioApi';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Trash2, Plus } from 'lucide-react';
import type { Project, Experience, Academic, Skill } from '../../types';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'experiences' | 'academics' | 'skills'>('projects');
  const queryClient = useQueryClient();

  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: () => getProjects() });
  const { data: experiences } = useQuery({ queryKey: ['experiences'], queryFn: () => getExperiences() });
  const { data: academics } = useQuery({ queryKey: ['academics'], queryFn: () => getAcademics() });
  const { data: skills } = useQuery({ queryKey: ['skills'], queryFn: () => getSkills() });

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });

  const deleteExperienceMutation = useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['experiences'] }),
  });

  const deleteAcademicMutation = useMutation({
    mutationFn: deleteAcademic,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['academics'] }),
  });

  const deleteSkillMutation = useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['skills'] }),
  });

  // Simple form states
  const [newProject, setNewProject] = useState<Partial<Project>>({ title: '', description: '', type: 'Web App' });
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    title: '',
    company: '',
    duration: '',
    location: '',
  });
  const [newAcademic, setNewAcademic] = useState<Partial<Academic>>({
    title: '',
    institution: '',
    date: '',
    type: 'Degree',
  });
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({ name: '', level: 50, category: 'Technical' });

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setNewProject({ title: '', description: '', type: 'Web App' });
    },
  });

  const createExperienceMutation = useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      setNewExperience({ title: '', company: '', duration: '', location: '' });
    },
  });

  const createAcademicMutation = useMutation({
    mutationFn: createAcademic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['academics'] });
      setNewAcademic({ title: '', institution: '', date: '', type: 'Degree' });
    },
  });

  const createSkillMutation = useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      setNewSkill({ name: '', level: 50, category: 'Technical' });
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground mt-2">Manage your portfolio content</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {(['projects', 'experiences', 'academics', 'skills'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize ${
              activeTab === tab
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              />
              <Input
                placeholder="Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
              <Input
                placeholder="Type (e.g., Web App)"
                value={newProject.type}
                onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
              />
              <Input
                placeholder="Tags (comma-separated)"
                value={newProject.tags || ''}
                onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
              />
              <Button
                onClick={() => {
                  if (newProject.title && newProject.description && newProject.type) {
                    createProjectMutation.mutate(newProject as Project);
                  }
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {projects?.map((project) => (
              <Card key={project.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.type}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => project.id && deleteProjectMutation.mutate(project.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Experiences Tab */}
      {activeTab === 'experiences' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Title"
                value={newExperience.title}
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
              />
              <Input
                placeholder="Company"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              />
              <Input
                placeholder="Duration (e.g., Jan 2020 - Present)"
                value={newExperience.duration}
                onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
              />
              <Input
                placeholder="Location"
                value={newExperience.location}
                onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
              />
              <Button
                onClick={() => {
                  if (newExperience.title && newExperience.company && newExperience.duration && newExperience.location) {
                    createExperienceMutation.mutate({
                      ...newExperience,
                      responsibilities: '[]',
                      achievements: '[]',
                    } as Experience);
                  }
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {experiences?.map((exp) => (
              <Card key={exp.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-semibold">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => exp.id && deleteExperienceMutation.mutate(exp.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Academics Tab */}
      {activeTab === 'academics' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Academic Item</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={newAcademic.type}
                onChange={(e) => setNewAcademic({ ...newAcademic, type: e.target.value })}
              >
                <option value="Degree">Degree</option>
                <option value="Certification">Certification</option>
                <option value="Publication">Publication</option>
                <option value="Coursework">Coursework</option>
              </select>
              <Input
                placeholder="Title"
                value={newAcademic.title}
                onChange={(e) => setNewAcademic({ ...newAcademic, title: e.target.value })}
              />
              <Input
                placeholder="Institution"
                value={newAcademic.institution}
                onChange={(e) => setNewAcademic({ ...newAcademic, institution: e.target.value })}
              />
              <Input
                placeholder="Date (e.g., Graduated Jul 2023)"
                value={newAcademic.date}
                onChange={(e) => setNewAcademic({ ...newAcademic, date: e.target.value })}
              />
              <Button
                onClick={() => {
                  if (newAcademic.title && newAcademic.institution && newAcademic.date && newAcademic.type) {
                    createAcademicMutation.mutate(newAcademic as Academic);
                  }
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Academic Item
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {academics?.map((acad) => (
              <Card key={acad.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-semibold">{acad.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {acad.type} • {acad.institution}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => acad.id && deleteAcademicMutation.mutate(acad.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Skill</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Skill Name"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              />
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              >
                <option value="Technical">Technical</option>
                <option value="Tools">Tools</option>
                <option value="Soft Skills">Soft Skills</option>
              </select>
              <div className="space-y-2">
                <label className="text-sm">Level: {newSkill.level}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              <Button
                onClick={() => {
                  if (newSkill.name && newSkill.category && newSkill.level !== undefined) {
                    createSkillMutation.mutate(newSkill as Skill);
                  }
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {skills?.map((skill) => (
              <Card key={skill.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <h3 className="font-semibold">{skill.name}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm text-muted-foreground">{skill.category}</span>
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => skill.id && deleteSkillMutation.mutate(skill.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
