import axios from 'axios';
import type { PersonalInfo, Project, Experience, Academic, Skill } from '../types';

// API base URL from environment variables (.env file)
// Default to localhost if not set
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Personal Info APIs
export const getPersonalInfo = async (): Promise<PersonalInfo> => {
  const { data } = await api.get<PersonalInfo>('/personal-info');
  return data;
};

export const savePersonalInfo = async (info: PersonalInfo): Promise<PersonalInfo> => {
  const { data } = await api.post<PersonalInfo>('/personal-info', info);
  return data;
};

// Project APIs
export const getProjects = async (): Promise<Project[]> => {
  const { data } = await api.get<Project[]>('/projects');
  return data;
};

export const getProject = async (id: number): Promise<Project> => {
  const { data } = await api.get<Project>(`/projects/${id}`);
  return data;
};

export const createProject = async (project: Project): Promise<Project> => {
  const { data } = await api.post<Project>('/projects', project);
  return data;
};

export const updateProject = async (id: number, project: Project): Promise<Project> => {
  const { data } = await api.put<Project>(`/projects/${id}`, project);
  return data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/projects/${id}`);
};

// Experience APIs
export const getExperiences = async (): Promise<Experience[]> => {
  const { data } = await api.get<Experience[]>('/experiences');
  return data;
};

export const getExperience = async (id: number): Promise<Experience> => {
  const { data} = await api.get<Experience>(`/experiences/${id}`);
  return data;
};

export const createExperience = async (experience: Experience): Promise<Experience> => {
  const { data } = await api.post<Experience>('/experiences', experience);
  return data;
};

export const updateExperience = async (id: number, experience: Experience): Promise<Experience> => {
  const { data } = await api.put<Experience>(`/experiences/${id}`, experience);
  return data;
};

export const deleteExperience = async (id: number): Promise<void> => {
  await api.delete(`/experiences/${id}`);
};

// Academic APIs
export const getAcademics = async (type?: string): Promise<Academic[]> => {
  const params = type ? { type } : {};
  const { data } = await api.get<Academic[]>('/academics', { params });
  return data;
};

export const getAcademic = async (id: number): Promise<Academic> => {
  const { data } = await api.get<Academic>(`/academics/${id}`);
  return data;
};

export const createAcademic = async (academic: Academic): Promise<Academic> => {
  const { data } = await api.post<Academic>('/academics', academic);
  return data;
};

export const updateAcademic = async (id: number, academic: Academic): Promise<Academic> => {
  const { data } = await api.put<Academic>(`/academics/${id}`, academic);
  return data;
};

export const deleteAcademic = async (id: number): Promise<void> => {
  await api.delete(`/academics/${id}`);
};

// Skill APIs
export const getSkills = async (category?: string): Promise<Skill[]> => {
  const params = category ? { category } : {};
  const { data } = await api.get<Skill[]>('/skills', { params });
  return data;
};

export const getSkill = async (id: number): Promise<Skill> => {
  const { data } = await api.get<Skill>(`/skills/${id}`);
  return data;
};

export const createSkill = async (skill: Skill): Promise<Skill> => {
  const { data } = await api.post<Skill>('/skills', skill);
  return data;
};

export const updateSkill = async (id: number, skill: Skill): Promise<Skill> => {
  const { data } = await api.put<Skill>(`/skills/${id}`, skill);
  return data;
};

export const deleteSkill = async (id: number): Promise<void> => {
  await api.delete(`/skills/${id}`);
};
