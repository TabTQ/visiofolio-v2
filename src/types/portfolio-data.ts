
export interface SocialLinks {
  github?: string;
  linkedin?: string;
}

export interface PersonalInfo {
  name: string;
  mobile?: string;
  email?: string;
  profilePicture?: string;
  profilePictureHint?: string;
  bio: string;
  socialLinks: SocialLinks;
  footerCopyrightName?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  type: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
  achievements?: string[];
}

export interface AcademicItemConfig {
  id: string;
  type: string;
  title: string;
  institution: string;
  date: string;
  description?: string;
  url?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: Project[];
  experiences: ExperienceItem[];
  academics: AcademicItemConfig[];
  skills: Skill[];
}
