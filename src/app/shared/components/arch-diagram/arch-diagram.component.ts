import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { ArchNode, ArchEdge } from '../../../core/models/arch-diagram.types';

export type { ArchNode, ArchEdge };

interface RenderedNode extends ArchNode {
  w: number;
  h: number;
}

interface RenderedEdge {
  from: RenderedNode;
  to: RenderedNode;
}

@Component({
  selector: 'app-arch-diagram',
  standalone: true,
  templateUrl: './arch-diagram.component.html',
  styleUrl: './arch-diagram.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchDiagramComponent {
  readonly _nodes = signal<ArchNode[]>([]);
  readonly _edges = signal<ArchEdge[]>([]);

  @Input({ required: true })
  set nodes(v: ArchNode[]) {
    this._nodes.set(v ?? []);
  }

  @Input({ required: true })
  set edges(v: ArchEdge[]) {
    this._edges.set(v ?? []);
  }

  readonly rendered = computed<{ nodes: RenderedNode[]; edges: RenderedEdge[] }>(() => {
    const nodes: RenderedNode[] = this._nodes().map((n) => ({
      ...n,
      w: Math.max(18, n.label.length * 1.4 + 4),
      h: n.type === 'db' ? 9 : 7,
    }));
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const edges: RenderedEdge[] = this._edges()
      .map(([from, to]) => {
        const a = byId.get(from);
        const b = byId.get(to);
        return a && b ? { from: a, to: b } : null;
      })
      .filter((e): e is RenderedEdge => e !== null);
    return { nodes, edges };
  });
}
