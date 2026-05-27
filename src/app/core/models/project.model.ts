import { ArchNode, ArchEdge } from './arch-diagram.types';

export type ProjectStatus = 'complete' | 'in-progress' | 'planned';

export interface ProjectMetric {
  /** e.g. "248", "100", "—" — kept as string so we can render units inline */
  value: string;
  /** e.g. "Testes", "% paridade", "Módulos" */
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
  /** Short primary language label shown on cards & comparison header (e.g. ".NET", "TypeScript", "Java") */
  primaryLang: string;
  /** Up to 4 numeric metrics shown as a stats grid on the detail page */
  metrics?: ProjectMetric[];
  /** Feature parity flags — same keys across all projects fuel the comparison table */
  features?: Record<string, boolean>;
  architecture: {
    summary: string;
    /** Stylized SVG diagram nodes (positions in 0–100 percent units) */
    nodes: ArchNode[];
    /** Edges as [fromId, toId] tuples */
    edges: ArchEdge[];
  };
  links: {
    github?: string;
  };
}
