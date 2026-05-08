import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should default to dark theme when localStorage is empty', () => {
    expect(service.theme()).toBe('dark');
  });

  it('should restore theme from localStorage on initialization', () => {
    localStorage.setItem('theme', 'light');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const restored = TestBed.inject(ThemeService);
    expect(restored.theme()).toBe('light');
  });

  it('should toggle from dark to light', () => {
    expect(service.theme()).toBe('dark');
    service.toggleTheme();
    expect(service.theme()).toBe('light');
  });

  it('should toggle from light to dark', () => {
    service.toggleTheme();
    service.toggleTheme();
    expect(service.theme()).toBe('dark');
  });

  it('should persist theme to localStorage on toggle', () => {
    service.toggleTheme();
    expect(localStorage.getItem('theme')).toBe('light');
    service.toggleTheme();
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('should apply data-theme attribute to documentElement', () => {
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    service.toggleTheme();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
