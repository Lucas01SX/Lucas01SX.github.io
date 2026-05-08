import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects-preview-section',
  imports: [RouterLink],
  templateUrl: './projects-preview-section.component.html',
  styleUrl: './projects-preview-section.component.scss',
})
export class ProjectsPreviewSectionComponent {
  readonly projects = [
    {
      slug: 'helpdesk-dotnet',
      title: 'Helpdesk API (.NET)',
      description:
        'Full helpdesk domain built in C# with Clean Architecture, EF Core, and PostgreSQL.',
      stack: ['C#', '.NET', 'EF Core', 'PostgreSQL'],
    },
    {
      slug: 'helpdesk-nestjs',
      title: 'Helpdesk API (NestJS)',
      description: 'Same domain reimplemented in TypeScript using Fastify, Prisma, and BullMQ.',
      stack: ['TypeScript', 'NestJS', 'Fastify', 'Prisma'],
    },
    {
      slug: 'helpdesk-java',
      title: 'Helpdesk API (Java)',
      description: 'Java implementation with Spring Boot, JPA, and JUnit 5 test coverage.',
      stack: ['Java', 'Spring Boot', 'JUnit 5'],
    },
  ];
}
