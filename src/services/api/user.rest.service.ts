import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { User } from '../../models/user'
import { HttpClient } from '@angular/common/http';
import { UiService } from '../ui.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserRestService extends RestService<User> {
  route = '/users';

  constructor(http: HttpClient, ui: UiService) {
    super(http, ui);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.url}/profile`) 
      .pipe(
        map(
          item => {
            return this.responseToCamelCase(item) as User;
          }
        )
      );
  }

  putProfile(item: User): Observable<User> {
    return this.http.put<User>(`${this.url}/profile`, this.formValueToSnake(item))
      .pipe(
        map(
          item => {
            return this.responseToCamelCase(item) as User;
          }
        )
      );
  }
}
