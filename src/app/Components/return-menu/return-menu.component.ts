import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ReturnMenu, ApiService} from '../../services/api.service';

@Component({
  selector: 'app-return-menu',
  templateUrl: './return-menu.component.html',
  styleUrls: ['./return-menu.component.css']
})
export class ReturnMenuComponent {

  public selectedDay: string = ''; // Property to store the selected day
  public menu: ReturnMenu = { soup: [], mainMeal: [] }; // Property to store the menu data
  constructor(public router: Router, private apiService: ApiService) {
    this.apiService.selectDay = this.selectedDay //passing data from component to menuService
  }

  getMenuForDay() {
    // Call the menuService method to retrieve the menu for the selected day
    this.apiService.requestMenuForDay(this.selectedDay).subscribe((data: any) => {
      this.menu = data;
    });
  }
}
