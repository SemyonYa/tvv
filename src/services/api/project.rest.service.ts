import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { UiService } from '../ui.service';
import { Project } from '../../models/Project';
import { CtorItem } from '../../models/Ctor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectRestService extends RestService<Project> {
  route = '/projects';

  constructor(http: HttpClient, ui: UiService) {
    super(http, ui);
  }

  tConstructor = (item: any): Project => {
    let project = this.responseToCamelCase(item) as Project;
    project.items = (item['items'] as any[]).map(i => this.responseToCamelCase(i) as CtorItem);
    return project;
  }

  postChildren(items: CtorItem[], ctorId: number): Observable<CtorItem[]> {
    return this.http.post<CtorItem[]>(`${this.url}/${ctorId}/children`, { items: items.map(item => this.formValueToSnake(item)) })
      .pipe(
        map(
          (items: any[]) => items.map(item => this.responseToCamelCase(item) as CtorItem)
        )
      );
  }
}
