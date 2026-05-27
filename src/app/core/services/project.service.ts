import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly url = 'assets/data/projects.json';

  private readonly all$ = this.http.get<Project[]>(this.url).pipe(shareReplay(1));

  getAll(): Observable<Project[]> {
    return this.all$;
  }

  getBySlug(slug: string): Observable<Project | undefined> {
    return this.getAll().pipe(map((projects) => projects.find((p) => p.slug === slug)));
  }
}
