import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Image } from '../../models/Image';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FileLoadingService {

  constructor(private http: HttpClient) { }

  upload(formData: FormData): Observable<Image[]> {
    return this.http.post<Image[]>(`${environment.baseUrl}/${environment.imagesDir}`, formData)
      .pipe(
        map(
          (is: any[]) => is.map(i => new Image(i.id, i.name))
        )
      );
  }
}
