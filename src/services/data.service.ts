import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region } from './map.service';
import { Observable } from 'rxjs';
import { Place } from 'src/models/Place';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CtorItem } from 'src/models/Ctor';
import { Project } from 'src/models/Project';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private route = '/public-data';

  constructor(private http: HttpClient) { }

  protected get url(): string { return `${environment.baseUrl}${this.route}`; }


  getPlaces(region: Region): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.url}/places/${region}`)
      .pipe(
        map(
          (items: any[]): Place[] => {
            return items.map((item: any): Place => {
              let ctor = this.responseToCamelCase(item) as Place;
              ctor.items = (item['items'] as any[]).map(i => this.responseToCamelCase(i) as CtorItem);
              return ctor;
            });
          }
        )
      );
  }
  getPlace(placeId: number): Observable<Place> {
    return this.http.get<Place>(`${this.url}/place/${placeId}`)
      .pipe(
        map(
          (item: any): Place => {
            let ctor = this.responseToCamelCase(item) as Place;
            ctor.items = (item['items'] as any[]).map(i => this.responseToCamelCase(i) as CtorItem);
            return ctor;
          }
        )
      );
  }

  getProject(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.url}/project/${projectId}`)
      .pipe(
        map(
          (item: any): Project => {
            console.log(item);

            let ctor = this.responseToCamelCase(item) as Project;
            ctor.items = (item['items'] as any[]).map(i => this.responseToCamelCase(i) as CtorItem);
            return ctor;
          }
        )
      );
  }

  protected formValueToSnake = (formValue: any) => {
    let newValue = {};
    for (let key in formValue) {
      newValue[key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)] = (typeof formValue[key] === 'boolean')
        ? 1
        : formValue[key]
    }
    return newValue;
  }

  protected responseToCamelCase = (response: any) => {
    var newObj = {};
    for (let d in response) {
      if (response.hasOwnProperty(d)) {
        newObj[d.replace(/(\_\w)/g, function (k) {
          return k[1].toUpperCase();
        })] = response[d];
      }
    }
    return newObj;
  }
}
