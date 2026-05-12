import { inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export type Lang = 'en' | 'pt-BR' | 'es';
export const AVAILABLE_LANGS: Lang[] = ['en', 'pt-BR', 'es'];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private transloco = inject(TranslocoService);

  readonly activeLang = signal<Lang>(this.transloco.getActiveLang() as Lang);

  setLang(lang: Lang): void {
    this.transloco.setActiveLang(lang);
    this.activeLang.set(lang);
    localStorage.setItem('lang', lang);
  }
}
