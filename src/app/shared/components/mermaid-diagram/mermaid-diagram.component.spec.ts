import { vi } from 'vitest';

vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn().mockResolvedValue({ svg: '<svg></svg>' }),
  },
}));

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MermaidDiagramComponent } from './mermaid-diagram.component';

describe('MermaidDiagramComponent', () => {
  let fixture: ComponentFixture<MermaidDiagramComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MermaidDiagramComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MermaidDiagramComponent);
    fixture.componentRef.setInput('definition', 'graph TD; A-->B');
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a container element', () => {
    expect(compiled.querySelector('.mermaid-diagram')).not.toBeNull();
  });
});
