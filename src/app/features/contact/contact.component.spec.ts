import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactComponent } from './contact.component';
import { translocoTesting } from '../../../testing/transloco-testing';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, translocoTesting],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the contact section', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-contact-section')).not.toBeNull();
  });
});
