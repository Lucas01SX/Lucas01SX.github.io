import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EngineeringApproachSectionComponent } from './engineering-approach-section.component';

describe('EngineeringApproachSectionComponent', () => {
  let fixture: ComponentFixture<EngineeringApproachSectionComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineeringApproachSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EngineeringApproachSectionComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render an "Engineering Approach" heading', () => {
    expect(compiled.querySelector('h2')?.textContent?.trim()).toBe('Engineering Approach');
  });

  it('should render 3 pillars', () => {
    const pillars = compiled.querySelectorAll('[data-testid="pillars"] li');
    expect(pillars.length).toBe(3);
  });

  it('should include a security pillar', () => {
    expect(compiled.textContent).toContain('Security');
  });

  it('should include an observability pillar', () => {
    expect(compiled.textContent).toContain('Observability');
  });

  it('should include a spec-before-code pillar', () => {
    expect(compiled.textContent).toContain('Spec');
  });
});
