import { Component } from '@angular/core';

@Component({
  selector: 'app-tech-stack-section',
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
      items: ['MSTest', 'Vitest', 'JUnit 5'],
    },
  ];
}
