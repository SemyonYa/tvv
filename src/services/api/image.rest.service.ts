import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { UiService } from '../ui.service';
import { Image } from 'src/models/Image';

@Injectable({
  providedIn: 'root'
})
export class ImageRestService extends RestService<Image> {
  route = '/images';

  constructor(http: HttpClient, ui: UiService) {
    super(http, ui);
  }
}
