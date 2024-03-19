import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ReturnMenu, ApiService, Menu} from '../../services/api.service';
import { DateService } from '../../services/date.service';
import { CheckerService } from '../../services/checker.service';


@Component({
  selector: 'app-return-menu',
  templateUrl: './return-menu.component.html',
  styleUrls: ['./return-menu.component.css']
})
export class ReturnMenuComponent {

  weeklyMenu: Menu[] = [];
  public selectedDay: string = ''; // Property to store the selected day
  public menu: ReturnMenu = { soup: [], mainMeal: [] }; // Property to store the menu data
  public noMenuAvailable: boolean = false; // Flag to indicate whether no menu is available

  constructor(public router: Router,
              private apiService: ApiService,
              private dateService: DateService,
              private CheckerService: CheckerService) {
              this.apiService.selectDay = this.selectedDay; //passing data from component to service
  }


  calculateFormattedDate(): string {
      //call DateService to format the selectedDay into that day's date
      return this.dateService.calculateDateFromDayOfWeek(this.selectedDay);
  }

    getMenuForDay() {
        // make API request to retrieve the menu for the selected day
        this.apiService.requestMenuForDay(this.selectedDay).subscribe(
            (data: any) => {
                this.menu = data;
                // Use CheckerService method to check if retrieved menu contains any data
                this.noMenuAvailable = this.CheckerService.checkMenuAvailability(this.menu);

                // if there's no data, noMenuAvailable = true -> Fetch weekly menu (contains info on why no menu)
                if (this.noMenuAvailable) {
                    this.CheckerService.getWeeklyMenu();

                    // Subscribe to the weeklyMenu$ observable to be displayed in the template
                    this.CheckerService.weeklyMenu$.subscribe((weeklyMenu) => {
                        this.weeklyMenu = weeklyMenu;
                        /* item.balenie in weeklyMenu contains info on why menu is not available
                        -> to be displayed in template instead of menu data */
                    });
                }
            },
            (error) => {
                console.error('Error fetching menu:', error);
                this.menu = { soup: [], mainMeal: [] }; // Reset menu data in case of an error
            }
        );
  }

}
