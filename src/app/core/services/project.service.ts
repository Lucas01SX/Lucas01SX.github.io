import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly url = 'assets/data/projects.json';

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  getBySlug(slug: string): Observable<Project | undefined> {
    return this.getAll().pipe(map((projects) => projects.find((p) => p.slug === slug)));
  }
}
