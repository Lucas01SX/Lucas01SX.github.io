import { ArchNode, ArchEdge } from './arch-diagram.types';

export type ProjectStatus = 'complete' | 'in-progress' | 'planned';

export interface ProjectMetric {
  value: string;
  /** i18n key in the form "metrics.<slug>" — looked up by transloco */
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  stack: string[];
  category: string;
  status: ProjectStatus;
  /** @deprecated prefer `language` + `framework`. Kept for backward compatibility. */
  primaryLang: string;
  /** Programming language (e.g. "C#", "TypeScript"). */
  language?: string;
  /** Primary framework (e.g. ".NET", "Angular"). */
  framework?: string;
  metrics?: ProjectMetric[];
  features?: Record<string, boolean>;
  architecture: {
    summary: string;
    nodes: ArchNode[];
    edges: ArchEdge[];
  };
  links: {
    github?: string;
  };
}
