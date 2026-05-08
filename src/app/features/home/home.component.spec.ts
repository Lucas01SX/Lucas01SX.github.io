import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the hero section', () => {
    expect(compiled.querySelector('app-hero-section')).not.toBeNull();
  });

  it('should render the about section', () => {
    expect(compiled.querySelector('app-about-section')).not.toBeNull();
  });

  it('should render the engineering approach section', () => {
    expect(compiled.querySelector('app-engineering-approach-section')).not.toBeNull();
  });

  it('should render the tech stack section', () => {
    expect(compiled.querySelector('app-tech-stack-section')).not.toBeNull();
  });

  it('should render the projects preview section', () => {
    expect(compiled.querySelector('app-projects-preview-section')).not.toBeNull();
  });

  it('should render the contact section', () => {
    expect(compiled.querySelector('app-contact-section')).not.toBeNull();
  });
});
