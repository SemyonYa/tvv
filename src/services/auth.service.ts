import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'AUTH_TOKEN';
  private TOKEN_VALUE = null;

  user$ = new BehaviorSubject<User>(null);

  constructor() { }

  get TOKEN() {
    let token = this.TOKEN_VALUE;
    if (!token) {
      token = JSON.parse(localStorage.getItem(this.TOKEN_KEY));
      if (token) {
        this.TOKEN_VALUE = token;
        if (!this.user$.value) {

        }
      }
    }
    return token;
  }

  login(token: string) {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
    this.TOKEN_VALUE = token;
  }

  logout() {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(null));
    this.TOKEN_VALUE = null;
  }
}
