import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService, AVAILABLE_LANGS, Lang } from '../../services/language.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslocoDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);
  private readonly languageService = inject(LanguageService);

  readonly theme = this.themeService.theme;
  readonly activeLang = this.languageService.activeLang;
  readonly langs = AVAILABLE_LANGS;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setLang(lang: Lang): void {
    this.languageService.setLang(lang);
  }
}
