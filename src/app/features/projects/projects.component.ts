import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective } from '@jsverse/transloco';
import { ProjectService } from '../../core/services/project.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ProjectsCompareComponent } from '../../shared/components/projects-compare/projects-compare.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink, TranslocoDirective, RevealDirective, ProjectsCompareComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private readonly projectService = inject(ProjectService);
  readonly projects = toSignal(this.projectService.getAll(), { initialValue: [] });

  /** Track mouse on the card so the radial-glow ::after follows the cursor. */
  onCardMove(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }
}
