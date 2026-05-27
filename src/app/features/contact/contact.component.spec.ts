import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContactComponent } from './contact.component';
import { ContactService } from './contact.service';
import { translocoTesting } from '../../../testing/transloco-testing';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;

  const contactServiceMock: Partial<ContactService> = {
    send: () => of({ success: true }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, translocoTesting],
      providers: [{ provide: ContactService, useValue: contactServiceMock }],
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
