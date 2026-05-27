import { Component } from '@angular/core';
import { ContactSectionComponent } from './contact-section.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactSectionComponent],
  template: `<app-contact-section />`,
})
export class ContactComponent {}
