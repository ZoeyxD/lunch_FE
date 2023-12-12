import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateService } from '../../services/date.service';
import {ApiService, Menu, OrderData, ReturnMenu} from '../../services/api.service';
import { CheckerService } from '../../services/checker.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public todaysOrders: OrderData[] | null = null;
  public todaysMenu: ReturnMenu = { soup: [], mainMeal: [] };
  public noMenusToday: boolean = false; // Flag to indicate whether no menu is available
  public weeklyMenu: Menu[] = [];
  public tomorrowDate: string = '';
  public tomorrowsOrders: OrderData[] | null = null;
  public currentDate: string = '';

  constructor(public router: Router,
              public dateService: DateService,
              private apiService: ApiService,
              private checkerService: CheckerService) {}


  ngOnInit(): void {
    //display today's date in full format
    this.currentDate = this.dateService.formatTodayDate();
    this.fetchTodaysMenu();
    // Subscribe to the weeklyMenu$ observable to be displayed in the template
    this.checkerService.weeklyMenu$.subscribe((weeklyMenu) => {
      this.weeklyMenu = weeklyMenu;
    });
  }

  fetchTodaysMenu() {
    const formattedDayOfWeek = this.dateService.formatDayOfWeek();
    const currentHour = new Date().getHours();

    // Check if today is a weekend (Saturday or Sunday)
    const dayOfWeek = this.dateService.getDayOfWeek();
    if (dayOfWeek === 0 || dayOfWeek === 6) { // 0 is Sunday, 6 is Saturday
      this.noMenusToday = true;
      this.todaysMenu = {soup: [], mainMeal: []};
      return;
    }

    if (currentHour >= 15) {
      // If it's past 3 pm, fetch tomorrow's menu
      this.apiService.requestMenuForDay(this.dateService.formatDayOfWeek(true)).subscribe((data: any) => {
        this.todaysMenu = data;
        this.noMenusToday = this.checkerService.checkMenuAvailability(this.todaysMenu);
        // Set tomorrow's formatted date
        this.tomorrowDate = this.dateService.formatTomorrowDate();

      });

    } else {

      // make API request to fetch the menu for today
      this.apiService.requestMenuForDay(formattedDayOfWeek).subscribe((data: any) => {
        this.todaysMenu = data;
        // Use CheckerService method to check if retrieved menu contains any data
        this.noMenusToday = this.checkerService.checkMenuAvailability(this.todaysMenu);

        if (this.noMenusToday) {
          // Fetch weekly menu if no menu is available for today (contains info on why no menu)
          this.checkerService.getWeeklyMenu();
        }
      });
    }
  }

  fetchTodaysOrders() {
    const currentHour = new Date().getHours();

    // make API request to retrieve orders made for today if it's before 3pm
    if (currentHour < 15) {
      this.apiService.checkOrders(this.checkerService.today).subscribe(
        (data) => {
          this.todaysOrders = data;
          this.tomorrowsOrders = null;
        },
        (error) => {
          console.error("Error fetching today's orders:", error);
        }
      );

    } else {
      // make API request to retrieve orders made for tomorrow
      this.apiService.checkOrders(this.checkerService.tomorrow).subscribe(
        (data) => {
          this.todaysOrders = data;
          this.tomorrowsOrders = null;
        },
        (error) => {
          console.error("Error fetching today's orders:", error);
        }
      );
    }
  }

  navigateToOrder(){
    this.router.navigate(['/order']);
  }

  navigateToSendMail() {
    this.router.navigate(['/mail']);
  }

  // Method to check if the current time is before 10:30am
  //for elements (mail button) that are supposed to be displayed only in the morning
  isMorning(): boolean {
    const currentHour = new Date().getHours();
    return currentHour < 10 || (currentHour === 10 && new Date().getMinutes() < 30);
  }

  // Method to check if the current time is after 3pm
  isAfternoon(): boolean {
    const currentHour = new Date().getHours();
    return currentHour >= 15;
  }
}
