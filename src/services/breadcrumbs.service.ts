import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService extends BehaviorSubject<BreadcrumbsItem[]> {
  // home: BreadcrumbsItem = { title: 'Главная', route: '/' };

  constructor() {
    super([]);
  }

  setItems(items: BreadcrumbsItem[] = null) {
    if (!items || items.length === 0) {
      this.next([]);
    } else {
      this.next([...items]);
    }
  }
}

export interface BreadcrumbsItem {
  title: string;
  route: string;
}