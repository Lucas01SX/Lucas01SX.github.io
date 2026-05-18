import { AfterViewInit, Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-mermaid-diagram',
  template: '<div #container class="mermaid-diagram"></div>',
  styleUrl: './mermaid-diagram.component.scss',
})
export class MermaidDiagramComponent implements AfterViewInit {
  readonly definition = input.required<string>();
  private readonly container = viewChild.required<ElementRef<HTMLDivElement>>('container');
  private readonly themeService = inject(ThemeService);

  async ngAfterViewInit(): Promise<void> {
    const mermaid = (await import('mermaid')).default;
    const theme = this.themeService.theme() === 'light' ? 'default' : 'dark';
    mermaid.initialize({ startOnLoad: false, theme });
    const id = `mermaid-${crypto.randomUUID()}`;
    const { svg } = await mermaid.render(id, this.definition());
    this.container().nativeElement.innerHTML = svg;
  }
}
