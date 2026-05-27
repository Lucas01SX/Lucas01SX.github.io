import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  send(payload: ContactPayload): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>('https://api.web3forms.com/submit', {
      access_key: environment.web3formsKey,
      ...payload,
    });
  }
}
