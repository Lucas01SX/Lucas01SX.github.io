import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeroSectionComponent } from './hero-section.component';
import { translocoTesting } from '../../../../../testing/transloco-testing';

describe('HeroSectionComponent', () => {
  let fixture: ComponentFixture<HeroSectionComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent, translocoTesting],
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
    const nameEl = compiled.querySelector('[data-testid="hero-name"]');
    const text = nameEl?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
    expect(text).toContain('Lucas');
    expect(text).toContain('Santana');
  });

  it('should render tech stack in the role line', () => {
    const roleEl = compiled.querySelector('[data-testid="hero-title"]');
    expect(roleEl?.textContent).toContain('.NET');
    expect(roleEl?.textContent).toContain('TypeScript');
  });

  it('should render a "View Projects" CTA', () => {
    const cta = compiled.querySelector('[data-testid="cta-projects"]');
    expect(cta).not.toBeNull();
    expect(cta?.textContent?.trim()).toContain('View Projects');
  });

  it('should render a "Contact" CTA linking to /contact', () => {
    const cta = compiled.querySelector('[data-testid="cta-contact"]');
    expect(cta).not.toBeNull();
    expect(cta?.getAttribute('href')).toBe('/contact');
  });
});
