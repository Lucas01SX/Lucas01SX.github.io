import { TranslocoTestingModule } from '@jsverse/transloco';

const en = {
  nav: { home: 'Home', projects: 'Projects', contact: 'Contact' },
  theme: {
    to_light: 'Light',
    to_dark: 'Dark',
    aria_to_light: 'Switch to light theme',
    aria_to_dark: 'Switch to dark theme',
  },
  hero: {
    eyebrow: 'BACKEND ENGINEER · AVAILABLE FOR PROJECTS',
    title: 'Backend Developer — .NET · TypeScript · Java',
    subtitle: 'Building secure, observable, and maintainable APIs for real-world systems.',
    cta_projects: 'View Projects',
    cta_contact: 'Contact',
  },
  about: {
    rail_label: '01 / ABOUT',
    rail_meta: 'Backend\nAPIs · Distributed Systems\n\nBased in Brazil',
    heading: 'About',
    bio1: "I'm a backend developer focused on building APIs that are secure by design, easy to observe in production, and maintainable over time. I work primarily with .NET/C#, TypeScript/NestJS, and Java/Spring Boot.",
    bio2: 'My approach is spec-first: I think through failure cases and invariants before writing a line of code. I care about structured logging, correlation IDs, and making systems that behave predictably under pressure.',
  },
  stack: { heading: 'Tech Stack' },
  tech_stack: {
    kicker: '03 / STACK',
    heading: 'Tech Stack',
  },
  approach: {
    kicker: '02 / APPROACH',
    heading: 'Engineering Approach',
    pillars: {
      security: {
        title: 'Security-First',
        description:
          'Auth, input validation, and access control are built into every layer — not added as afterthoughts.',
      },
      observability: {
        title: 'Observability by Design',
        description:
          'Structured logging, correlation IDs, and meaningful error responses make production debugging tractable.',
      },
      spec: {
        title: 'Spec Before Code',
        description:
          'Failure cases and invariants are defined before implementation. Tests drive the design.',
      },
    },
  },
  projects_preview: {
    kicker: '04 / PROJECTS',
    heading: 'Same domain. Different stacks.',
    sub: 'Three implementations of the same helpdesk system.',
    view_project: 'View Project',
    view_all: 'View all projects',
    aria_view: 'View',
  },
  projects_page: {
    kicker: 'PROJECTS · 3 IMPLEMENTATIONS',
    heading: 'Same domain. Different stacks.',
    subtitle: 'Same domain. Different stacks. Each one built to demonstrate architecture depth.',
    loading: 'Loading projects...',
    view_project: 'View Project',
    aria_view: 'View',
    status: { 'in-progress': 'In Progress', planned: 'Planned', complete: 'Complete' },
  },
  compare: {
    kicker: 'COMPARISON · FEATURE PARITY',
    heading: 'What each one delivers.',
    sub: 'All three versions share the same domain.',
    feature: 'Feature',
  },
  contact: {
    kicker: 'CONTACT',
    heading: 'Contact',
    sub: 'Interested in collaborating?',
    name: 'Name',
    name_placeholder: "What's your name?",
    email: 'Email',
    email_placeholder: 'you@example.com',
    message: 'Message',
    message_placeholder: 'What do you want to talk about?',
    send: 'Send message',
    submit: 'Send Message',
    sending: 'Sending...',
    submitting: 'Sending...',
    sent: 'Message sent',
    success: "Message sent! I'll get back to you soon.",
    error_generic: 'Something went wrong. Please try again.',
    error_send: 'Something went wrong. Please try again.',
    errors: {
      name: 'Please enter a valid name (2-100 characters).',
      email: 'Please enter a valid email address.',
      message: 'Message must be between 10 and 2000 characters.',
    },
    error: {
      name_required: 'Name is required.',
      name_min: 'Name must be at least 2 characters.',
      name_max: 'Name cannot exceed 100 characters.',
      name_pattern: 'Name can only contain letters, spaces, hyphens, and apostrophes.',
      email_required: 'Email is required.',
      email_invalid: 'Please enter a valid email address.',
      email_max: 'Email cannot exceed 254 characters.',
      message_required: 'Message is required.',
      message_min: 'Message must be at least 10 characters.',
      message_max: 'Message cannot exceed 2000 characters.',
    },
  },
  footer: { copy: '© {{ year }} Lucas Santana. All rights reserved.' },
  projects: {
    'helpdesk-dotnet': {
      shortDescription: 'Helpdesk ticket system built with Modular Monolith...',
      description: 'Full description of the .NET project.',
      architectureSummary: 'Clean Architecture summary.',
    },
    'helpdesk-nestjs': {
      shortDescription:
        'Same helpdesk domain reimplemented in TypeScript using NestJS, Fastify, Prisma, and EventEmitter2.',
      description: 'Full description of the NestJS project.',
      architectureSummary: 'Modular NestJS architecture summary.',
    },
    'helpdesk-java': {
      shortDescription: 'Java implementation with Spring Boot, JPA, and JUnit 5 test coverage.',
      description: 'Full description of the Java project.',
      architectureSummary: 'Spring Boot layered architecture summary.',
    },
    'project-a': {
      shortDescription: 'Short A',
      description: 'Description A',
      architectureSummary: 'Arch A',
    },
    'project-b': {
      shortDescription: 'Short B',
      description: 'Description B',
      architectureSummary: 'Arch B',
    },
    p1: { shortDescription: 'Desc 1', description: '', architectureSummary: '' },
    p2: { shortDescription: 'Desc 2', description: '', architectureSummary: '' },
    p3: { shortDescription: 'Desc 3', description: '', architectureSummary: '' },
  },
  project_detail: {
    tech_stack: 'Tech Stack',
    architecture: 'ARCHITECTURE',
    architecture_title: 'How the system is structured.',
    back_to_projects: 'Projects',
    other_projects: 'Other projects',
    view_on_github: 'View on GitHub',
    not_found: 'Project not found.',
  },
};

export const translocoTesting = TranslocoTestingModule.forRoot({
  langs: { en },
  translocoConfig: {
    defaultLang: 'en',
    availableLangs: ['en', 'pt-BR', 'es'],
  },
  preloadLangs: true,
});
