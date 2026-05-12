import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';

import { routes } from './app.routes';
import { TranslocoHttpLoader } from './transloco-loader';

function resolveInitialLang(): string {
  const stored = localStorage.getItem('lang');
  if (stored && ['en', 'pt-BR', 'es'].includes(stored)) return stored;

  const browser = navigator.language;
  if (browser.startsWith('pt')) return 'pt-BR';
  if (browser.startsWith('es')) return 'es';
  return 'en';
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'pt-BR', 'es'],
        defaultLang: resolveInitialLang(),
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
