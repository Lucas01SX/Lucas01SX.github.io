import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContactSectionComponent } from './contact-section.component';
import { ContactService } from './contact.service';
import { translocoTesting } from '../../../testing/transloco-testing';

describe('ContactSectionComponent', () => {
  let fixture: ComponentFixture<ContactSectionComponent>;
  let compiled: HTMLElement;

  const contactServiceMock: Partial<ContactService> = {
    send: () => of({ success: true }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSectionComponent, translocoTesting],
      providers: [{ provide: ContactService, useValue: contactServiceMock }],
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
    const link = compiled.querySelector('[data-testid="channel-github"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toContain('github.com/Lucas01SX');
  });

  it('should render a LinkedIn link', () => {
    const link = compiled.querySelector('[data-testid="channel-linkedin"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toContain('linkedin.com/in/lucas-dev-dotnet');
  });

  it('should render an email link', () => {
    const link = compiled.querySelector('[data-testid="channel-email"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toContain('mailto:');
  });

  it('should render a contact form', () => {
    expect(compiled.querySelector('[data-testid="contact-form"]')).not.toBeNull();
  });

  it('should render a name input field', () => {
    expect(compiled.querySelector('[data-testid="contact-name"]')).not.toBeNull();
  });

  it('should render an email input field', () => {
    expect(compiled.querySelector('[data-testid="contact-email"]')).not.toBeNull();
  });

  it('should render a message textarea', () => {
    expect(compiled.querySelector('[data-testid="contact-message"]')).not.toBeNull();
  });

  it('should render a submit button', () => {
    const btn = compiled.querySelector('[data-testid="contact-submit"]');
    expect(btn).not.toBeNull();
    expect(btn?.getAttribute('type')).toBe('submit');
  });

  it('should show error state when form is submitted empty', () => {
    const btn = compiled.querySelector<HTMLButtonElement>('[data-testid="contact-submit"]');
    btn?.click();
    fixture.detectChanges();
    const nameInput = compiled.querySelector('[data-testid="contact-name"]');
    expect(nameInput?.getAttribute('aria-invalid')).toBe('true');
  });

  it('should transition to success state on valid submission', () => {
    const comp = fixture.componentInstance;
    comp.form.setValue({ name: 'Lucas', email: 'lucas@test.com', message: 'Hello there world!' });
    comp.submit();
    fixture.detectChanges();
    expect(comp.state()).toBe('success');
  });
});
