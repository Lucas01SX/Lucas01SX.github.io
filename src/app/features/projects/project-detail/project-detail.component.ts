import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { ProjectService } from '../../../core/services/project.service';
import { MermaidDiagramComponent } from '../../../shared/components/mermaid-diagram/mermaid-diagram.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [MermaidDiagramComponent],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);

  readonly project = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('slug') ?? ''),
      switchMap((slug) => this.projectService.getBySlug(slug)),
    ),
  );
}
