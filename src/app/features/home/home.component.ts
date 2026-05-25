import { Component } from '@angular/core';
import { HeroSectionComponent } from './sections/hero/hero-section.component';
import { AboutSectionComponent } from './sections/about/about-section.component';
import { EngineeringApproachSectionComponent } from './sections/engineering-approach/engineering-approach-section.component';
import { TechStackSectionComponent } from './sections/tech-stack/tech-stack-section.component';
import { ProjectsPreviewSectionComponent } from './sections/projects-preview/projects-preview-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    AboutSectionComponent,
    EngineeringApproachSectionComponent,
    TechStackSectionComponent,
    ProjectsPreviewSectionComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
