export interface PersonalInfo {
  id?: number;
  name: string;
  mobile?: string;
  email?: string;
  profilePicture?: string;
  profilePictureHint?: string;
  bio: string;
  githubUrl?: string;
  linkedinUrl?: string;
  footerCopyrightName?: string;
}

export interface Project {
  id?: number;
  title: string;
  description: string;
  imageUrl?: string;
  imageHint?: string;
  tags?: string; // comma-separated
  liveUrl?: string;
  repoUrl?: string;
  type: string;
  displayOrder?: number;
}

export interface Experience {
  id?: number;
  title: string;
  company: string;
  duration: string;
  location: string;
  responsibilities?: string; // JSON array string
  achievements?: string; // JSON array string
  displayOrder?: number;
}

export interface Academic {
  id?: number;
  type: string; // Degree, Certification, Coursework, Publication
  title: string;
  institution: string;
  date: string;
  description?: string;
  url?: string;
  displayOrder?: number;
}

export interface Skill {
  id?: number;
  name: string;
  level: number; // 0-100
  category: string; // Technical, Tools, Soft Skills
  displayOrder?: number;
}
