import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { TranslocoDirective } from '@jsverse/transloco';
import { ProjectService } from '../../../core/services/project.service';
import { ArchDiagramComponent } from '../../../shared/components/arch-diagram/arch-diagram.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [ArchDiagramComponent, TranslocoDirective, RouterLink, RevealDirective],
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
