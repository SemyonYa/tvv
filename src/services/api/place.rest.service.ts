import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { UiService } from '../ui.service';

@Injectable({
  providedIn: 'root'
}) // TODO: type ANY
export class PlaceRestService extends RestService<any> {
  route = '/places';

  constructor(http: HttpClient, ui: UiService) {
    super(http, ui);
  }
}
