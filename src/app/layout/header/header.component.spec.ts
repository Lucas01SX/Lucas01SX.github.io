import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';
import { ThemeService } from '../../core/services/theme.service';
import { translocoTesting } from '../../../testing/transloco-testing';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, translocoTesting],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the logo name "Lucas Santana"', () => {
    expect(compiled.querySelector('[data-testid="logo"]')?.textContent?.trim()).toContain(
      'Lucas Santana',
    );
  });

  it('should render navigation links for Home, Projects, and Contact', () => {
    const links = Array.from(compiled.querySelectorAll('nav a'));
    const texts = links.map((a) => a.textContent?.trim());
    expect(texts).toContain('Home');
    expect(texts).toContain('Projects');
    expect(texts).toContain('Contact');
  });

  it('should render a theme toggle button', () => {
    expect(compiled.querySelector('[data-testid="theme-toggle"]')).not.toBeNull();
  });

  it('should call toggleTheme() when the toggle button is clicked', () => {
    const themeService = TestBed.inject(ThemeService);
    const spy = vi.spyOn(themeService, 'toggleTheme');
    compiled.querySelector<HTMLButtonElement>('[data-testid="theme-toggle"]')?.click();
    expect(spy).toHaveBeenCalledOnce();
  });
});
