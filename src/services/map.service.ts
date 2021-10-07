import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  objects$ = new BehaviorSubject<MapObject[]>(null);
  cameraPosition$ = new BehaviorSubject<MapCameraPosition>(null);

  regions: { [key: string]: MapCameraPosition } = {
    'Псковская область': {
      xPercent: 36,
      yPercent: 32,
      scale: 2.3
    },
    'Орловская область': {
      xPercent: 40,
      yPercent: -25,
      scale: 4.3
    },
    'Калужская область': {
      xPercent: 32,
      yPercent: -22,
      scale: 4.5
    },
    'Тульская область': {
      xPercent: 32,
      yPercent: -36,
      scale: 4.5
    },
    'Москва и Московская область': {
      xPercent: 22,
      yPercent: -10,
      scale: 3.1
    },
    'Рязанская область': {
      xPercent: 18,
      yPercent: -31,
      scale: 3.5
    },
    'Ярославская область': {
      xPercent: 6,
      yPercent: 0,
      scale: 3.5
    },
    'Владимирская область': {
      xPercent: 10,
      yPercent: -16,
      scale: 4
    },
    'Ивановская область': {
      xPercent: 2,
      yPercent: -15,
      scale: 4.1
    },
    'Нижегородская область': {
      xPercent: -6,
      yPercent: -28,
      scale: 2.2
    },
    'Республика Чувашия': {
      xPercent: -10,
      yPercent: -42,
      scale: 4.6
    },
    'Республика Марий Эл': {
      xPercent: -17,
      yPercent: -37,
      scale: 4
    },
    'Кировская область': {
      xPercent: -35,
      yPercent: -24,
      scale: 2
    }
  };

  moveCameraTo(region: Region = null) {
    console.log(region);
    if (region) {
      console.log(region);
      this.cameraPosition$.next(this.regions[region.toString()]);
    } else {
      console.log(region);
      this.cameraPosition$.next({ scale: 1, xPercent: 0, yPercent: 0 });
    }

    if (region) {
      document.querySelectorAll('g.group').forEach(g => {
        console.log(region, g['dataset'].id, g['dataset'].id == region);
        if (g['dataset'].id == region) {
          g.classList.remove('inactive');
          g.classList.add('active');
        } else {
          g.classList.remove('active');
          g.classList.add('inactive');
        }
      });
    } else {
      document.querySelectorAll('g.group').forEach(g => {
        g.classList.remove('active', 'inactive');
      });
    }


  }
}

export class MapObject {
  id: number;
  title: string;
  type: MapObjectType;
  coords: Coordinates;
}

export type MapObjectType = 'capital' | 'city' | 'place' | 'object';

export type Region = 'Псковская область' | 'Орловская область' | 'Калужская область' | 'Тульская область' | 'Москва и Московская область' | 'Рязанская область' | 'Ярославская область' | 'Владимирская область' | 'Ивановская область' | 'Нижегородская область' | 'Республика Чувашия' | 'Республика Марий Эл' | 'Кировская область';

export interface Coordinates {
  x: number;
  y: number;
}

export interface MapCameraPosition {
  xPercent: number;
  yPercent: number;
  scale: number;
}
