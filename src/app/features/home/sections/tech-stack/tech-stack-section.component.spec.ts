import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechStackSectionComponent } from './tech-stack-section.component';
import { translocoTesting } from '../../../../../testing/transloco-testing';

describe('TechStackSectionComponent', () => {
  let fixture: ComponentFixture<TechStackSectionComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechStackSectionComponent, translocoTesting],
    }).compileComponents();

    fixture = TestBed.createComponent(TechStackSectionComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a "Tech Stack" heading', () => {
    expect(compiled.querySelector('h2')?.textContent?.trim()).toBe('Tech Stack');
  });

  it('should render 4 categories', () => {
    const categories = compiled.querySelectorAll('[data-testid="stack-category"]');
    expect(categories.length).toBe(4);
  });

  it('should not render any progress bars', () => {
    expect(compiled.querySelector('progress')).toBeNull();
    expect(compiled.querySelector('[role="progressbar"]')).toBeNull();
  });

  it('should list backend technologies', () => {
    expect(compiled.textContent).toContain('.NET');
  });

  it('should list data technologies', () => {
    expect(compiled.textContent).toContain('PostgreSQL');
  });
});
