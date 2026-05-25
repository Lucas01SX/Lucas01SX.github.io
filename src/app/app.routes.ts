import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects.component').then((m) => m.ProjectsComponent),
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./features/projects/project-detail/project-detail.component').then(
        (m) => m.ProjectDetailComponent,
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
