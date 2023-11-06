import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lunch_FE';
  isLoggedIn: boolean = false;

  constructor(public router: Router, public loginService: LoginService) {}

  logout() {
    // Call method in LoginService to reset the login state
    this.loginService.logout();

    // Navigate to the home page
    this.router.navigate(['/']);
  }

}
