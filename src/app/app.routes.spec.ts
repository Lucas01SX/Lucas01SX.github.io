import { routes } from './app.routes';

describe('App Routes', () => {
  it('should have exactly 4 routes defined', () => {
    expect(routes.length).toBe(4);
  });

  it('should have root path pointing to HomeComponent (lazy)', () => {
    const route = routes.find(r => r.path === '');
    expect(route).toBeDefined();
    expect(route?.loadComponent).toBeDefined();
  });

  it('should have /projects path pointing to ProjectsComponent (lazy)', () => {
    const route = routes.find(r => r.path === 'projects');
    expect(route).toBeDefined();
    expect(route?.loadComponent).toBeDefined();
  });

  it('should have /projects/:slug path pointing to ProjectDetailComponent (lazy)', () => {
    const route = routes.find(r => r.path === 'projects/:slug');
    expect(route).toBeDefined();
    expect(route?.loadComponent).toBeDefined();
  });

  it('should have wildcard route pointing to NotFoundComponent (lazy)', () => {
    const route = routes.find(r => r.path === '**');
    expect(route).toBeDefined();
    expect(route?.loadComponent).toBeDefined();
  });

  it('should have wildcard route as the last route', () => {
    expect(routes[routes.length - 1].path).toBe('**');
  });
});
