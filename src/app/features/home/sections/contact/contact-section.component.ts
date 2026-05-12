import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslocoDirective } from '@jsverse/transloco';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

function namePattern(control: AbstractControl): ValidationErrors | null {
  const val = (control.value as string) ?? '';
  if (!val) return null;
  return /^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-'.]+$/.test(val) ? null : { namePattern: true };
}

function notBlank(control: AbstractControl): ValidationErrors | null {
  const val = (control.value as string) ?? '';
  return val.trim().length > 0 ? null : { required: true };
}

@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule, TranslocoDirective],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent {
  @ViewChild('honeypot') private honeypot!: ElementRef<HTMLInputElement>;

  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  readonly state = signal<SubmitState>('idle');
  readonly submitted = signal(false);

  readonly form = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(100), namePattern],
    ],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    message: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(2000), notBlank],
    ],
  });

  get nameCtrl() {
    return this.form.controls.name;
  }
  get emailCtrl() {
    return this.form.controls.email;
  }
  get messageCtrl() {
    return this.form.controls.message;
  }
  get messageLength() {
    return this.messageCtrl.value?.length ?? 0;
  }

  showError(field: 'name' | 'email' | 'message'): boolean {
    const ctrl = this.form.controls[field];
    return ctrl.invalid && (ctrl.dirty || ctrl.touched || this.submitted());
  }

  submit(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;
    if (this.honeypot?.nativeElement.value) return;

    const { name, email, message } = this.form.value;
    this.state.set('submitting');

    this.http
      .post<{ success: boolean }>('https://api.web3forms.com/submit', {
        access_key: 'b3ee9b6c-6b8b-431e-93b8-40fe48cb9a8c',
        name: name!.trim(),
        email: email!.trim(),
        message: message!.trim(),
      })
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.state.set('success');
            this.form.reset();
            this.submitted.set(false);
          } else {
            this.state.set('error');
          }
        },
        error: () => this.state.set('error'),
      });
  }
}
