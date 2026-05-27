export interface ArchNode {
  id: string;
  label: string;
  x: number; // percent (0–100, can overflow up to ±10)
  y: number; // percent (0–100)
  type?: 'entry' | 'shared' | 'db' | 'default';
}

export type ArchEdge = [from: string, to: string];
