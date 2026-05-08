import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);
  readonly theme = this.themeService.theme;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
