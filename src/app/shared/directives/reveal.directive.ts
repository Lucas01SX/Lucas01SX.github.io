import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: {
    class: 'reveal',
  },
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  /** Delay in ms before applying the .is-visible class once intersected */
  @Input() revealDelay = 0;
  /** IntersectionObserver threshold (0–1) */
  @Input() revealThreshold = 0.05;

  private observer?: IntersectionObserver;
  private fallbackTimer?: ReturnType<typeof setTimeout>;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
      this.show();
      return;
    }

    // Safety fallback — if the observer never fires (e.g. inside certain iframe
    // contexts), still reveal after 500ms so content is never permanently hidden.
    this.fallbackTimer = setTimeout(() => this.show(), 500);

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Broken-observer guard: zero-size + null rootBounds
          if (entry.rootBounds === null && entry.boundingClientRect.height === 0) {
            this.show();
            return;
          }
          if (entry.isIntersecting) {
            setTimeout(() => this.show(), this.revealDelay);
            return;
          }
        }
      },
      {
        threshold: this.revealThreshold,
        rootMargin: '0px 0px -40px 0px',
      },
    );

    this.observer.observe(this.el.nativeElement);
  }

  private show(): void {
    this.el.nativeElement.classList.add('is-visible');
    this.cleanup();
  }

  private cleanup(): void {
    if (this.fallbackTimer) {
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = undefined;
    }
    this.observer?.disconnect();
    this.observer = undefined;
  }

  ngOnDestroy(): void {
    this.cleanup();
  }
}
