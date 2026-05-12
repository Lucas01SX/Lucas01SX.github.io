import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { translocoTesting } from '../../../testing/transloco-testing';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, translocoTesting],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render copyright text containing "Lucas Santana"', () => {
    expect(compiled.textContent).toContain('Lucas Santana');
  });

  it('should render a GitHub link', () => {
    const githubLink = compiled.querySelector('a[aria-label="GitHub"]');
    expect(githubLink).not.toBeNull();
    expect(githubLink?.getAttribute('href')).toContain('github.com/Lucas01SX');
  });

  it('should render a LinkedIn link', () => {
    const linkedinLink = compiled.querySelector('a[aria-label="LinkedIn"]');
    expect(linkedinLink).not.toBeNull();
    expect(linkedinLink?.getAttribute('href')).toContain('linkedin.com/in/lucas-dev-dotnet');
  });
});
