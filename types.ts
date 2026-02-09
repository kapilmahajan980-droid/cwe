
export enum AppTab {
  HOME = 'HOME',
  RESUMES = 'RESUMES',
  PROJECTS = 'PROJECTS',
  JOBS = 'JOBS'
}

export interface ResumeTemplate {
  id: string;
  title: string;
  image: string;
  atsScore: number;
  companies: string[];
  isLocked: boolean;
  price: number;
  includes: string[];
}

export interface ProjectTemplate {
  id: string;
  title: string;
  image: string;
  category: string;
  isLocked: boolean;
  color: string;
}

export interface AppState {
  currentTab: AppTab;
  selectedResume: ResumeTemplate | null;
  unlockedAll: boolean;
}
