// ────────────────────────────────────────────────────────────
// ProjectsCompareComponent — feature-parity table for the 3 helpdesks
// NEW component:
//   src/app/shared/components/projects-compare/projects-compare.component.ts
//   src/app/shared/components/projects-compare/projects-compare.component.html
//   src/app/shared/components/projects-compare/projects-compare.component.scss
//
// Drop into projects.component.html at the bottom (or anywhere on the
// /projects page).
// ────────────────────────────────────────────────────────────

import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { Project } from '../../../core/models/project.model';

interface ComparisonRow {
  label: string;
  cells: {
    kind: 'text' | 'check' | 'dash' | 'status' | 'badge';
    value?: string;
    statusKey?: string;
  }[];
}

@Component({
  selector: 'app-projects-compare',
  standalone: true,
  imports: [TranslocoDirective],
  templateUrl: './projects-compare.component.html',
  styleUrl: './projects-compare.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsCompareComponent {
  readonly _projects = signal<Project[]>([]);

  @Input({ required: true })
  set projects(v: Project[]) {
    this._projects.set(v ?? []);
  }

  readonly featureKeys = computed<string[]>(() => {
    const first = this._projects()[0];
    return first?.features ? Object.keys(first.features) : [];
  });

  readonly rows = computed<ComparisonRow[]>(() => {
    const projects = this._projects();
    if (projects.length === 0) return [];

    const out: ComparisonRow[] = [];

    out.push({
      label: 'Status',
      cells: projects.map((p) => ({
        kind: 'status',
        statusKey: p.status,
      })),
    });

    out.push({
      label: 'Testes',
      cells: projects.map((p) => {
        const total = p.metrics?.[0]?.value ?? '—';
        return {
          kind: 'text',
          value: total !== '—' ? `${total} testes` : '—',
        };
      }),
    });

    out.push({
      label: 'ORM / Persistência',
      cells: projects.map((p) => {
        const orm = p.stack.find((s) => /Core|Prisma|JPA/.test(s)) ?? '—';
        return { kind: 'text', value: orm };
      }),
    });

    for (const key of this.featureKeys()) {
      out.push({
        label: key,
        cells: projects.map((p) => ({
          kind: p.features?.[key] ? 'check' : 'dash',
        })),
      });
    }

    return out;
  });
}
