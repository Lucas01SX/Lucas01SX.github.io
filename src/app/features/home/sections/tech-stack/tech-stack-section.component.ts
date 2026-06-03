import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-tech-stack-section',
  standalone: true,
  imports: [TranslocoDirective, RevealDirective],
  templateUrl: './tech-stack-section.component.html',
  styleUrl: './tech-stack-section.component.scss',
})
export class TechStackSectionComponent {
  readonly categories = [
    { name: 'Backend', items: ['.NET / C#', 'EF Core', 'PostgreSQL'] },
    { name: 'Frontend', items: ['Angular', 'TypeScript', 'RxJS', 'SCSS'] },
    { name: 'DevOps', items: ['Docker', 'GitHub Actions'] },
    { name: 'Testing', items: ['xUnit', 'Vitest', 'TestContainers'] },
  ];
}
