import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Project } from '../../../../core/models/project.model';
import { ProjectService } from '../../../../core/services/project.service';
import { ProjectsPreviewSectionComponent } from './projects-preview-section.component';
import { translocoTesting } from '../../../../../testing/transloco-testing';

const mockProjects: Project[] = [
  {
    slug: 'p1',
    title: 'Project 1',
    shortDescription: 'Desc 1',
    description: '',
    stack: ['TypeScript'],
    category: 'API',
    status: 'in-progress',
    primaryLang: 'TypeScript',
    architecture: { summary: '', nodes: [], edges: [] },
    links: {},
  },
  {
    slug: 'p2',
    title: 'Project 2',
    shortDescription: 'Desc 2',
    description: '',
    stack: ['C#'],
    category: 'API',
    status: 'planned',
    primaryLang: '.NET',
    architecture: { summary: '', nodes: [], edges: [] },
    links: {},
  },
  {
    slug: 'p3',
    title: 'Project 3',
    shortDescription: 'Desc 3',
    description: '',
    stack: ['Java'],
    category: 'API',
    status: 'planned',
    primaryLang: 'Java',
    architecture: { summary: '', nodes: [], edges: [] },
    links: {},
  },
];

describe('ProjectsPreviewSectionComponent', () => {
  let fixture: ComponentFixture<ProjectsPreviewSectionComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsPreviewSectionComponent, translocoTesting],
      providers: [
        provideRouter([]),
        { provide: ProjectService, useValue: { getAll: () => of(mockProjects) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsPreviewSectionComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the section heading', () => {
    expect(compiled.querySelector('h2')?.textContent?.trim()).toBe(
      'Same domain. Different stacks.',
    );
  });

  it('should render exactly 3 project cards', () => {
    const cards = compiled.querySelectorAll('[data-testid="project-card"]');
    expect(cards.length).toBe(3);
  });

  it('should render a link for each project card', () => {
    const links = compiled.querySelectorAll('[data-testid="project-link"]');
    expect(links.length).toBe(3);
  });

  it('should render a "View all projects" link', () => {
    expect(compiled.querySelector('[data-testid="all-projects-link"]')).not.toBeNull();
  });
});
