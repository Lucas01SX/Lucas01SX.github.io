import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ContactService } from './contact.service';
import { environment } from '../../../environments/environment';

describe('ContactService', () => {
  let service: ContactService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ContactService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => controller.verify());

  it('should POST to Web3Forms endpoint', () => {
    service.send({ name: 'Lucas', email: 'lucas@test.com', message: 'Hello' }).subscribe();

    const req = controller.expectOne('https://api.web3forms.com/submit');
    expect(req.request.method).toBe('POST');
  });

  it('should include access_key from environment in the request body', () => {
    service.send({ name: 'Lucas', email: 'lucas@test.com', message: 'Hello' }).subscribe();

    const req = controller.expectOne('https://api.web3forms.com/submit');
    expect(req.request.body.access_key).toBe(environment.web3formsKey);
  });

  it('should include name, email and message in the request body', () => {
    const payload = { name: 'Lucas', email: 'lucas@test.com', message: 'Hello there!' };
    service.send(payload).subscribe();

    const req = controller.expectOne('https://api.web3forms.com/submit');
    expect(req.request.body.name).toBe('Lucas');
    expect(req.request.body.email).toBe('lucas@test.com');
    expect(req.request.body.message).toBe('Hello there!');
  });

  it('should return success: true when the API responds successfully', () => {
    let result: { success: boolean } | undefined;
    service.send({ name: 'Lucas', email: 'lucas@test.com', message: 'Hi' }).subscribe((r) => {
      result = r;
    });

    const req = controller.expectOne('https://api.web3forms.com/submit');
    req.flush({ success: true });
    expect(result?.success).toBe(true);
  });
});
