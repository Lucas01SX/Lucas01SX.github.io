import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
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
  private readonly transloco = inject(TranslocoService);
  private readonly lang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang(),
  });

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
    this.lang(); // reactive dependency — recomputes on language change
    const t = (key: string, params?: Record<string, unknown>) =>
      this.transloco.translate(key, params);
    const projects = this._projects();
    if (projects.length === 0) return [];

    const out: ComparisonRow[] = [];

    out.push({
      label: t('compare.row_status'),
      cells: projects.map((p) => ({
        kind: 'status',
        statusKey: p.status,
      })),
    });

    out.push({
      label: t('compare.row_tests'),
      cells: projects.map((p) => {
        const testsMetric = p.metrics?.find((m) => /^\d+$/.test(m.value));
        const total = testsMetric?.value ?? '—';
        return {
          kind: 'text',
          value: total !== '—' ? t('compare.tests_unit', { count: total }) : '—',
        };
      }),
    });

    out.push({
      label: t('compare.row_orm'),
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
