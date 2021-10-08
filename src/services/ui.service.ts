import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  // TODO: connect components at app.component.ts
  error$ = new BehaviorSubject<string>(null);
  success$ = new BehaviorSubject<string>(null);

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
}
