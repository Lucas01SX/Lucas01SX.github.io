import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';

@Component({
  selector: 'app-mermaid-diagram',
  template: '<div #container class="mermaid-diagram"></div>',
  styleUrl: './mermaid-diagram.component.scss',
})
export class MermaidDiagramComponent implements AfterViewInit {
  readonly definition = input.required<string>();
  private readonly container = viewChild.required<ElementRef<HTMLDivElement>>('container');

  async ngAfterViewInit(): Promise<void> {
    const mermaid = (await import('mermaid')).default;
    mermaid.initialize({ startOnLoad: false, theme: 'dark' });
    const id = `mermaid-${Date.now()}`;
    const { svg } = await mermaid.render(id, this.definition());
    this.container().nativeElement.innerHTML = svg;
  }
}
