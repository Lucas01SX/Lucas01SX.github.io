import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-engineering-approach-section',
  imports: [TranslocoDirective],
  templateUrl: './engineering-approach-section.component.html',
  styleUrl: './engineering-approach-section.component.scss',
})
export class EngineeringApproachSectionComponent {
  readonly pillarKeys = ['security', 'observability', 'spec'] as const;
}
