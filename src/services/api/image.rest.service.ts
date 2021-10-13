import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UiService } from '../ui.service';
import { Image } from 'src/models/Image';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageRestService extends RestService<Image> {
  route = '/images';

  constructor(http: HttpClient, ui: UiService) {
    super(http, ui);
  }

  getByParams(params: HttpParams = new HttpParams()): Observable<Image[]> {
    // this.list$.next(null);
    return this.http.get<Image[]>(`${this.url}/by-params`, { params })
      .pipe(
        map(
          (items: any[]): Image[] => {
            return items.map(this.tConstructor) as Image[];
          }
        )
        // catchError(err => {
        //   console.log(err);
        //   return throwError(err);
        // })
      );
    // .subscribe(
    //   items => {
    //     this.list$.next(items);
    //   },
    //   this.handleError,
    //   // err => {
    //   //   console.log(err);
    //   // }
    // )
  }
}
