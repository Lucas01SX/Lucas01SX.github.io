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
    {
      name: 'Backend',
      items: ['.NET / C#', 'TypeScript / NestJS', 'Java / Spring Boot'],
    },
    {
      name: 'Data',
      items: ['PostgreSQL', 'EF Core', 'Prisma'],
    },
    {
      name: 'DevOps',
      items: ['Docker', 'GitHub Actions'],
    },
    {
      name: 'Testing',
      items: ['xUnit', 'Vitest', 'JUnit 5', 'TestContainers'],
    },
  ];
}
