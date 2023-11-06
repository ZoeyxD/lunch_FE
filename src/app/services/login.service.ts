import { Injectable } from '@angular/core';

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
}
