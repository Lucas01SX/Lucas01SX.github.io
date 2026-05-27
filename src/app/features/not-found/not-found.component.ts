import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, TranslocoDirective],
  template: `
    <main class="not-found section" *transloco="let t">
      <div class="container not-found__container">
        <p class="not-found__code">404</p>
        <h1 class="not-found__title">{{ t('not_found.heading') }}</h1>
        <p class="not-found__sub">{{ t('not_found.sub') }}</p>
        <a routerLink="/" class="btn btn--primary">
          {{ t('not_found.back') }} <span class="arrow">→</span>
        </a>
      </div>
    </main>
  `,
  styles: [
    `
      .not-found__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
        gap: var(--space-5);
        text-align: center;
      }
      .not-found__code {
        font-family: var(--font-mono);
        font-size: clamp(4rem, 12vw, 8rem);
        font-weight: var(--weight-semibold);
        color: var(--accent);
        line-height: 1;
        letter-spacing: -0.05em;
      }
      .not-found__title {
        font-size: var(--text-4xl);
        font-weight: var(--weight-semibold);
        letter-spacing: -0.03em;
      }
      .not-found__sub {
        color: var(--text-2);
        font-size: var(--text-lg);
        max-width: 40ch;
      }
    `,
  ],
})
export class NotFoundComponent {}
