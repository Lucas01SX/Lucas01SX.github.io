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
    const allKeys = new Set(this._projects().flatMap((p) => Object.keys(p.features ?? {})));
    return [...allKeys];
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
        const testsMetric = p.metrics?.find((m) => /^\d+$/.test(m.value));
        const total = testsMetric?.value ?? '—';
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
