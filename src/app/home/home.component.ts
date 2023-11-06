import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-success',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public router: Router) {}

  navigateToMenu() {
    this.router.navigate(['/menu']); //navigate to weekly menu page
  }

  getMenuForDay() {
    this.router.navigate(['/return-menu']); //navigate to weekly return-menu page
  }

  navigateToOrder() {
    this.router.navigate(['/order']); //navigate to weekly order page
  }
  navigateToList() {
    this.router.navigate(['/lunch-by-date']); //navigate to weekly order page
  }
  navigateToSettings() {
    this.router.navigate(['/settings']); //navigate to weekly order page
  }
  sendEmail() {
    this.router.navigate(['/mail']); //navigate to weekly order page
  }

}
