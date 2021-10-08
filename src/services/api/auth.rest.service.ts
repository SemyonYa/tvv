import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { UiService } from '../ui.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthRestService extends RestService<any> {
  route = '/auth';

  constructor(http: HttpClient, ui: UiService) {
    super(http, ui);
  }

  post(item: LoginViewModel): Observable<string> {
    return this.http.post<string>(this.url, this.formValueToSnake(item));
  }
}

export interface LoginViewModel {
  login: string;
  password: string; 
}