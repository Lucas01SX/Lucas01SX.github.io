import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutSectionComponent } from './about-section.component';

describe('AboutSectionComponent', () => {
  let fixture: ComponentFixture<AboutSectionComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutSectionComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render an "About" heading', () => {
    expect(compiled.querySelector('h2')?.textContent?.trim()).toBe('About');
  });

  it('should describe a "developer" role, not "engineer"', () => {
    const text = compiled.textContent?.toLowerCase() ?? '';
    expect(text).toContain('developer');
    expect(text).not.toContain('engineer');
  });

  it('should mention .NET as a technology', () => {
    expect(compiled.textContent).toContain('.NET');
  });

  it('should mention TypeScript as a technology', () => {
    expect(compiled.textContent).toContain('TypeScript');
  });
});
