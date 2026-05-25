import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-engineering-approach-section',
  standalone: true,
  imports: [TranslocoDirective, RevealDirective],
  templateUrl: './engineering-approach-section.component.html',
  styleUrl: './engineering-approach-section.component.scss',
})
export class EngineeringApproachSectionComponent {
  readonly pillarKeys = ['security', 'observability', 'spec'] as const;
}
