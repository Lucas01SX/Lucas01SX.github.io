import { Component, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { RevealDirective } from './reveal.directive';

@Component({
  standalone: true,
  imports: [RevealDirective],
  template: `<div appReveal>content</div>`,
})
class TestHostComponent {}

describe('RevealDirective', () => {
  describe('browser platform', () => {
    it('should attach the reveal CSS class to the host element', async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent],
      }).compileComponents();

      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.directive(RevealDirective));
      expect(el.nativeElement.classList).toContain('reveal');
    });

    it('should add is-visible after the fallback timer fires', async () => {
      vi.useFakeTimers();

      await TestBed.configureTestingModule({
        imports: [TestHostComponent],
      }).compileComponents();

      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.directive(RevealDirective));

      vi.advanceTimersByTime(600);

      expect(el.nativeElement.classList).toContain('is-visible');

      vi.useRealTimers();
    });
  });

  describe('server platform (SSR)', () => {
    it('should immediately add is-visible on a non-browser platform', async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent],
        providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
      }).compileComponents();

      const fixture: ComponentFixture<TestHostComponent> =
        TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.directive(RevealDirective));
      expect(el.nativeElement.classList).toContain('is-visible');
    });
  });
});
