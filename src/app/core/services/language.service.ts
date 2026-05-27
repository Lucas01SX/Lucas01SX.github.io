import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';

export type Lang = 'en' | 'pt-BR' | 'es';
export const AVAILABLE_LANGS: Lang[] = ['en', 'pt-BR', 'es'];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly transloco = inject(TranslocoService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly activeLang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang() as Lang,
  });

  constructor() {
    if (this.isBrowser) {
      document.documentElement.lang = this.transloco.getActiveLang();
    }
  }

  setLang(lang: Lang): void {
    this.transloco.setActiveLang(lang);
    if (this.isBrowser) {
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang;
    }
  }
}
