export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  profileImage?: string;
  title?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies?: string[];
  companyLogo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
  honors?: string[];
  relevantCoursework?: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Language' | 'Soft' | 'Other';
  yearsOfExperience?: number;
  endorsed?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  logo?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
  role?: string;
  achievements?: string[];
  images?: string[];
}

export interface Language {
  id: string;
  name: string;
  level: 'Native' | 'Fluent' | 'Conversational' | 'Basic';
  certification?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface VolunteerWork {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  description?: string;
  coAuthors?: string[];
}

export interface CVData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  projects: Project[];
  awards: Award[];
  volunteerWork: VolunteerWork[];
  publications: Publication[];
  customSections: CustomSection[];
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
  order: number;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  url?: string;
}

export interface CVTemplate {
  id: string;
  name: string;
  category: 'Corporate' | 'Creative' | 'Modern' | 'Classic' | 'Tech' | 'Executive' | 'Academic' | 'Healthcare' | 'Legal' | 'Marketing' | 'Finance' | 'Education' | 'Sales' | 'Consulting';
  description: string;
  previewImage: string;
  industry: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  features: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
    muted: string;
  };
  fonts: {
    heading: string;
    body: string;
    accent?: string;
  };
  layout: {
    columns: 1 | 2;
    headerStyle: 'centered' | 'left' | 'split';
    sectionSpacing: 'compact' | 'normal' | 'spacious';
  };
  premium?: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  subscription: 'free' | 'premium';
  createdAt: string;
  lastLogin: string;
}

export interface SavedCV {
  id: string;
  name: string;
  templateId: string;
  data: CVData;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  shareUrl?: string;
}

export interface ExportOptions {
  format: 'pdf' | 'docx' | 'txt' | 'html';
  quality: 'standard' | 'high' | 'print';
  includeColors: boolean;
  pageSize: 'A4' | 'Letter' | 'Legal';
  margins: 'narrow' | 'normal' | 'wide';
}

export interface TemplateStyle {
  id: string;
  name: string;
  description: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
    muted: string;
  };
  typography: {
    heading: string;
    body: string;
    accent?: string;
  };
  layout: {
    headerStyle: 'centered' | 'left' | 'split' | 'modern' | 'classic';
    sectionLayout: 'traditional' | 'modern' | 'creative' | 'minimal';
    spacing: 'compact' | 'normal' | 'spacious';
    borders: 'none' | 'subtle' | 'bold' | 'creative';
  };
}

export interface ResumeFormat {
  id: string;
  name: string;
  description: string;
  targetAudience: string[];
  sections: string[];
  emphasis: 'chronological' | 'functional' | 'combination' | 'creative' | 'academic';
  length: 'one-page' | 'two-page' | 'multi-page';
  features: string[];
}