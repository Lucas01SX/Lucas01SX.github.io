export interface ProjectArchitecture {
  summary: string;
  diagram: string;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  stack: string[];
  category: string;
  status: 'planned' | 'in-progress' | 'complete';
  architecture: ProjectArchitecture;
  links: {
    github?: string;
  };
}
