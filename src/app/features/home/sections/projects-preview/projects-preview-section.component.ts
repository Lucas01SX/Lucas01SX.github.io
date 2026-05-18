import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'app-projects-preview-section',
  imports: [RouterLink, TranslocoDirective],
  templateUrl: './projects-preview-section.component.html',
  styleUrl: './projects-preview-section.component.scss',
})
export class ProjectsPreviewSectionComponent {
  private readonly projectService = inject(ProjectService);
  readonly projects = toSignal(this.projectService.getAll(), { initialValue: [] });
}
