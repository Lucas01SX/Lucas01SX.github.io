import { Component } from '@angular/core';

@Component({
  selector: 'app-engineering-approach-section',
  templateUrl: './engineering-approach-section.component.html',
  styleUrl: './engineering-approach-section.component.scss',
})
export class EngineeringApproachSectionComponent {
  readonly pillars = [
    {
      title: 'Security-First',
      description:
        'Auth, input validation, and access control are built into every layer — not added as afterthoughts.',
    },
    {
      title: 'Observability by Design',
      description:
        'Structured logging, correlation IDs, and meaningful error responses make production debugging tractable.',
    },
    {
      title: 'Spec Before Code',
      description:
        'Failure cases and invariants are defined before implementation. Tests drive the design.',
    },
  ];
}
