import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ProjectsComponent } from './projects.component';
import { translocoTesting } from '../../../testing/transloco-testing';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.model';

const mockProjects: Project[] = [
  {
    slug: 'project-a',
    title: 'Project A',
    shortDescription: 'Short A',
    description: 'Description A',
    stack: ['Angular', 'TypeScript'],
    category: 'Backend API',
    status: 'complete',
    primaryLang: 'TypeScript',
    architecture: { summary: 'Arch A', nodes: [], edges: [] },
    links: { github: 'https://github.com/test' },
  },
  {
    slug: 'project-b',
    title: 'Project B',
    shortDescription: 'Short B',
    description: 'Description B',
    stack: ['C#', '.NET'],
    category: 'Backend API',
    status: 'in-progress',
    primaryLang: '.NET',
    architecture: { summary: 'Arch B', nodes: [], edges: [] },
    links: {},
  },
];

describe('ProjectsComponent', () => {
  let fixture: ComponentFixture<ProjectsComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, translocoTesting],
      providers: [
        provideRouter([]),
        {
          provide: ProjectService,
          useValue: { getAll: () => of(mockProjects) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a page heading', () => {
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe('From API to interface.');
  });

  it('should render a card for each project', () => {
    const cards = compiled.querySelectorAll('[data-testid="project-card"]');
    expect(cards.length).toBe(2);
  });

  it('should render a link for each project card', () => {
    const links = compiled.querySelectorAll('[data-testid="project-link"]');
    expect(links.length).toBe(2);
  });

  it('should render the project title in each card', () => {
    const titles = Array.from(compiled.querySelectorAll('.proj-card__title')).map((el) =>
      el.textContent?.trim(),
    );
    expect(titles).toContain('Project A');
    expect(titles).toContain('Project B');
  });

  it('should render a status badge for each project', () => {
    const badges = compiled.querySelectorAll('[data-testid="project-status"]');
    expect(badges.length).toBe(2);
  });
});
