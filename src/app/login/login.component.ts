import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private apiService: ApiService, public loginService: LoginService) {}

  onSubmit() {
    // Call the authenticateUser method with the provided username and password
    this.apiService.authenticateUser(this.username, this.password).subscribe(
      (response) => {
        if (response.logged) {

      // Authentication successful, navigate to the success route
      this.router.navigate(['/home']);

      // Call the service to set isLoggedIn to true
      this.loginService.login();

    } else {
      // Authentication failed, display an error message.
      this.errorMessage = 'Invalid username or password';
    }
  },
      (error) => {
        // Handle errors, e.g., display an error message.
        this.errorMessage = 'An error occurred during authentication';
      }
    );
  }
}

