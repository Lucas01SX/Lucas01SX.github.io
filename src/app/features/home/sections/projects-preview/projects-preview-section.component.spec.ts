import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProjectsPreviewSectionComponent } from './projects-preview-section.component';

describe('ProjectsPreviewSectionComponent', () => {
  let fixture: ComponentFixture<ProjectsPreviewSectionComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsPreviewSectionComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsPreviewSectionComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a "Projects" heading', () => {
    expect(compiled.querySelector('h2')?.textContent?.trim()).toBe('Projects');
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
