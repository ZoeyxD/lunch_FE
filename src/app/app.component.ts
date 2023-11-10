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
  username: string = '';

  constructor(public router: Router, public loginService: LoginService) {

    // Subscribe to the currentUsername observable
    this.loginService.currentUsername.subscribe((username) => {
      this.username = username;
    });
  }


    logout()
    {
      // Call method in LoginService to reset the login state
      this.loginService.logout();

      // Navigate to the home page
      this.router.navigate(['/']);
    }

    navigateToMenu()
    {
      this.router.navigate(['/menu']); //navigate to weekly menu page
    }

    getMenuForDay()
    {
      this.router.navigate(['/return-menu']); //navigate to weekly return-menu page
    }

    navigateToOrder()
    {
      this.router.navigate(['/order']); //navigate to weekly order page
    }
    navigateToList()
    {
      this.router.navigate(['/lunch-by-date']); //navigate to weekly order page
    }
    navigateToSettings()
    {
      this.router.navigate(['/settings']); //navigate to weekly order page
    }
    sendEmail()
    {
      this.router.navigate(['/mail']); //navigate to weekly order page
    }
  }

