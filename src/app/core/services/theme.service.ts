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
    this.watchSystemPreference();
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
    if (saved === 'light' || saved === 'dark') return saved;
    const prefersLight =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  }

  private watchSystemPreference(): void {
    if (!this.isBrowser || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (ev: MediaQueryListEvent) => {
      if (localStorage.getItem('theme')) return;
      const next: Theme = ev.matches ? 'dark' : 'light';
      this._theme.set(next);
      this.applyTheme(next);
    };
    mq.addEventListener?.('change', handler);
  }

  private applyTheme(theme: Theme): void {
    if (!this.isBrowser) return;
    document.documentElement.setAttribute('data-theme', theme);
  }
}
