import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly _theme = signal<Theme>(this.loadTheme());

  readonly theme = this._theme.asReadonly();

  constructor() {
    this.applyTheme(this._theme());
  }

  toggleTheme(): void {
    const next: Theme = this._theme() === 'dark' ? 'light' : 'dark';
    this._theme.set(next);
    if (this.isBrowser) localStorage.setItem('theme', next);
    this.applyTheme(next);
  }

  private loadTheme(): Theme {
    if (!this.isBrowser) return 'dark';
    const saved = localStorage.getItem('theme');
    return saved === 'light' ? 'light' : 'dark';
  }

  private applyTheme(theme: Theme): void {
    if (!this.isBrowser) return;
    document.documentElement.setAttribute('data-theme', theme);
  }
}
