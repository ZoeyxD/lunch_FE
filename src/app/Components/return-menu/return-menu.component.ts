import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ReturnMenu, ApiService, Menu} from '../../services/api.service';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-return-menu',
  templateUrl: './return-menu.component.html',
  styleUrls: ['./return-menu.component.css']
})
export class ReturnMenuComponent implements OnInit {

  weeklyMenu: Menu[] = [];
  public selectedDay: string = ''; // Property to store the selected day
  public menu: ReturnMenu = { soup: [], mainMeal: [] }; // Property to store the menu data
  public noMenuAvailable: boolean = false; // Flag to indicate whether no menu is available

  constructor(public router: Router, private apiService: ApiService, private dateService: DateService,) {
    this.apiService.selectDay = this.selectedDay; //passing data from component to service
  }

  getMenuForDay() {
    // Call method to retrieve the menu for the selected day
    this.apiService.requestMenuForDay(this.selectedDay).subscribe((data: any) => {
      this.menu = data;
      this.handleMenuResponse();
    },
        (error) => {
          console.error("Error fetching menu:", error);
          this.menu = { soup: [], mainMeal: [] }; // Reset menu data in case of an error
          this.handleMenuResponse();
        }
    );
  }

  private handleMenuResponse() {
    this.noMenuAvailable = !(this.menu && (this.menu.soup.length > 0 || this.menu.mainMeal.length > 0));
  }

  getMenuData() {
    // Call the menuService method to retrieve this week's menu
    this.apiService.requestMenuData().subscribe((data) => {

      // Assign the fetched data to the 'menu' property, which will be used in the template
      this.weeklyMenu = data;
    })
  }

  ngOnInit() {
    this.getMenuData();
  }
  calculateFormattedDate(): string {
    return this.dateService.calculateDateFromDayOfWeek(this.selectedDay);
  }

}
