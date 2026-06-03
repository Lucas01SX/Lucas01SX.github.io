import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProjectService } from './project.service';
import { Project } from '../models/project.model';

const mockProjects: Project[] = [
  {
    slug: 'project-a',
    title: 'Project A',
    shortDescription: 'Short A',
    description: 'Description A',
    stack: ['TypeScript'],
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
    stack: ['C#'],
    category: 'Backend API',
    status: 'planned',
    primaryLang: '.NET',
    architecture: { summary: 'Arch B', nodes: [], edges: [] },
    links: {},
  },
];

describe('ProjectService', () => {
  let service: ProjectService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProjectService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => controller.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all projects from the JSON file', () => {
    let result: Project[] | undefined;
    service.getAll().subscribe((projects) => (result = projects));

    const req = controller.expectOne('assets/data/projects.json');
    req.flush(mockProjects);

    expect(result).toHaveLength(2);
    expect(result?.[0].slug).toBe('project-a');
  });

  it('should find a project by slug', () => {
    let result: Project | undefined;
    service.getBySlug('project-b').subscribe((p) => (result = p));

    const req = controller.expectOne('assets/data/projects.json');
    req.flush(mockProjects);

    expect(result?.slug).toBe('project-b');
    expect(result?.title).toBe('Project B');
  });

  it('should return undefined for an unknown slug', () => {
    let result: Project | undefined;
    service.getBySlug('does-not-exist').subscribe((p) => (result = p));

    const req = controller.expectOne('assets/data/projects.json');
    req.flush(mockProjects);

    expect(result).toBeUndefined();
  });
});
