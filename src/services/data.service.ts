import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapObject, Coordinates, MapObjectType } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  get mock(): MapObject[] {
    return ['capital', 'city', 'place', 'object'].map((item, index) => {
      return { id: 1, title: `Name ${item}`, coords: { x: 200 + 100 * index, y: 100 + 35 * index } as Coordinates, type: item as MapObjectType };
    });
  }
}