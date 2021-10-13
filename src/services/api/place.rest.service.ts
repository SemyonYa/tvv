import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { UiService } from '../ui.service';
import { Place } from 'src/models/Place';
import { CtorItem } from 'src/models/Ctor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Region } from '../map.service';

@Injectable({
  providedIn: 'root'
}) // TODO: type ANY
export class PlaceRestService extends RestService<Place> {
  route = '/places';

  constructor(http: HttpClient, ui: UiService) {
    super(http, ui);
  }

  getBy(region: Region): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.url}/${region}`)
      .pipe(
        map(
          (items: any[]): Place[] => {
            return items.map(this.tConstructor);
          }
        )
      );
  }

  tConstructor = (item: any): Place => {
    let ctor = this.responseToCamelCase(item) as Place;
    ctor.items = (item['items'] as any[]).map(i => this.responseToCamelCase(i) as CtorItem);
    return ctor;
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
