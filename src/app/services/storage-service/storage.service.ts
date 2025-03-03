import { Injectable } from '@angular/core';
import { User } from '../../../interfaces/User';
import { BehaviorSubject } from 'rxjs';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private userSubject = new BehaviorSubject<User>(this.getUser());
  user$ = this.userSubject.asObservable();
  user!: User;

  saveUser(user: User) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser() {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
  }

  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

  clean() {
    window.sessionStorage.clear();
    this.userSubject.next(this.user);
  }
}
