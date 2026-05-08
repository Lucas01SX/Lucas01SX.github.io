import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactSectionComponent } from './contact-section.component';

describe('ContactSectionComponent', () => {
  let fixture: ComponentFixture<ContactSectionComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactSectionComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a "Contact" heading', () => {
    expect(compiled.querySelector('h2')?.textContent?.trim()).toBe('Contact');
  });

  it('should render a GitHub link', () => {
    const link = compiled.querySelector('[data-testid="contact-github"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toContain('github.com/Lucas01SX');
  });

  it('should render a LinkedIn link', () => {
    const link = compiled.querySelector('[data-testid="contact-linkedin"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toContain('linkedin.com/in/lucas-dev-dotnet');
  });

  it('should render an email link', () => {
    const link = compiled.querySelector('[data-testid="contact-email"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toContain('mailto:');
  });

  it('should render a contact form', () => {
    expect(compiled.querySelector('[data-testid="contact-form"]')).not.toBeNull();
  });

  it('should render a name input field', () => {
    expect(compiled.querySelector('[data-testid="field-name"]')).not.toBeNull();
  });

  it('should render an email input field', () => {
    expect(compiled.querySelector('[data-testid="field-email"]')).not.toBeNull();
  });

  it('should render a message textarea', () => {
    expect(compiled.querySelector('[data-testid="field-message"]')).not.toBeNull();
  });

  it('should render a submit button', () => {
    const btn = compiled.querySelector('[data-testid="form-submit"]');
    expect(btn).not.toBeNull();
    expect(btn?.getAttribute('type')).toBe('submit');
  });
});
