import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeroSectionComponent } from './hero-section.component';

describe('HeroSectionComponent', () => {
  let fixture: ComponentFixture<HeroSectionComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the name "Lucas Santana"', () => {
    expect(compiled.querySelector('[data-testid="hero-name"]')?.textContent?.trim()).toBe(
      'Lucas Santana',
    );
  });

  it('should render a title containing "Backend Developer"', () => {
    expect(compiled.querySelector('[data-testid="hero-title"]')?.textContent).toContain(
      'Backend Developer',
    );
  });

  it('should render a "View Projects" CTA', () => {
    const cta = compiled.querySelector('[data-testid="cta-projects"]');
    expect(cta).not.toBeNull();
    expect(cta?.textContent?.trim()).toBe('View Projects');
  });

  it('should render a "Contact" CTA linking to #contact', () => {
    const cta = compiled.querySelector('[data-testid="cta-contact"]');
    expect(cta).not.toBeNull();
    expect(cta?.getAttribute('href')).toBe('#contact');
  });
});
