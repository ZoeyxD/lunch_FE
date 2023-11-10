import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn: boolean = false;
  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
   }

  private usernameSource = new BehaviorSubject<string>('');
  currentUsername = this.usernameSource.asObservable();
  updateUsername(username: string) {
    this.usernameSource.next(username);
  }

}
