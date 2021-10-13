import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  // TODO: connect components at app.component.ts
  error$ = new BehaviorSubject<string>(null);
  success$ = new BehaviorSubject<string>(null);
  popup$ = new BehaviorSubject<PopupParams>(null);

  constructor() { }

  hideAll() {
    this.hideError();
    this.hideSuccess();
  }

  // SUCCESS
  showSuccess(text: string = 'Success') {
    this.hideAll()
    this.success$.next(text);
  }

  hideSuccess() {
    this.success$.next(null);
  }

  // ERROR
  showError(text: string) {
    this.hideAll()
    this.error$.next(text);
  }

  hideError() {
    this.error$.next(null);
  }

  showPopup(params: PopupParams) {
    this.popup$.next(params);
  }

  hidePopup() {
    this.popup$.next(null);
  }
}

export interface PopupParams {
  x: number;
  y: number;
  msg: string;
  callback: Function;
}
