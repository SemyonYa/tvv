import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  objects$ = new BehaviorSubject<MapObject[]>(null);
  selectedRegion$ = new BehaviorSubject<SelectedRegion>(null);
  // region$ = new BehaviorSubject<Region>(null);

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

  selectRegion(region: Region = null) {
    if (this.selectedRegion$.value?.title != region) {
      if (region) {
        this.selectedRegion$.next({ title: region, cameraPosition: this.regions[region.toString()] });
      } else {
        this.selectedRegion$.next({ title: null, cameraPosition: { scale: 1, xPercent: 0, yPercent: 0 } });
      }

      if (region) {
        document.querySelectorAll('g.group').forEach(g => {
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

  setObjects(objects: MapObject[]) {
    this.objects$.next(objects);
  }
}

export class MapObject {
  id: number;
  title: string;
  type: MapObjectType;
  coords: Coordinates;
}

export type MapObjectType = 'capital' | 'city' | 'place' | 'project';

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

export interface SelectedRegion {
  title: Region;
  cameraPosition: MapCameraPosition;
}
