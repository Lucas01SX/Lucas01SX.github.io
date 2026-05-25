import { vi } from 'vitest';

vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn().mockResolvedValue({ svg: '<svg></svg>' }),
  },
}));

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { convertToParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';
import { translocoTesting } from '../../../../testing/transloco-testing';

const mockProject: Project = {
  slug: 'helpdesk-dotnet',
  title: 'Helpdesk API (.NET)',
  shortDescription: 'Short description',
  description: 'Full description of the project.',
  stack: ['C#', '.NET 8', 'PostgreSQL'],
  category: 'Backend API',
  status: 'in-progress',
  architecture: {
    summary: 'Clean Architecture summary.',
    diagram: 'graph TD; A-->B',
  },
  links: { github: 'https://github.com/Lucas01SX' },
};

describe('ProjectDetailComponent', () => {
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailComponent, translocoTesting],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ slug: 'helpdesk-dotnet' })),
          },
        },
        {
          provide: ProjectService,
          useValue: { getBySlug: () => of(mockProject) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the project title', () => {
    expect(compiled.querySelector('[data-testid="project-title"]')?.textContent?.trim()).toBe(
      'Helpdesk API (.NET)',
    );
  });

  it('should render the project description', () => {
    expect(compiled.querySelector('[data-testid="project-description"]')?.textContent?.trim()).toBe(
      'Full description of the .NET project.',
    );
  });

  it('should render the tech stack section', () => {
    expect(compiled.querySelector('[data-testid="stack-section"]')).not.toBeNull();
    expect(compiled.textContent).toContain('C#');
  });

  it('should render the architecture section', () => {
    expect(compiled.querySelector('[data-testid="architecture-section"]')).not.toBeNull();
    expect(compiled.textContent).toContain('Clean Architecture summary.'); // from transloco-testing mock
  });

  it('should render a GitHub link', () => {
    const link = compiled.querySelector('[data-testid="github-link"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toContain('github.com');
  });

  it('should render a mermaid diagram component', () => {
    expect(compiled.querySelector('app-mermaid-diagram')).not.toBeNull();
  });
});

describe('ProjectDetailComponent — project not found', () => {
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailComponent, translocoTesting],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ slug: 'unknown-slug' })),
          },
        },
        {
          provide: ProjectService,
          useValue: { getBySlug: () => of(undefined) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should render a not-found message when slug does not match any project', () => {
    expect(compiled.querySelector('[data-testid="not-found-message"]')).not.toBeNull();
  });
});
