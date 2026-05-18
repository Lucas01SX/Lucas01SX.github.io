import { AbstractControl, ValidationErrors } from '@angular/forms';

export function namePattern(control: AbstractControl): ValidationErrors | null {
  const val = (control.value as string) ?? '';
  if (!val) return null;
  return /^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-'.]+$/.test(val) ? null : { namePattern: true };
}

export function notBlank(control: AbstractControl): ValidationErrors | null {
  const val = (control.value as string) ?? '';
  return val.trim().length > 0 ? null : { required: true };
}
