import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateService } from '../../services/date.service';
import { ApiService, OrderData, ReturnMenu } from '../../services/api.service';
import { OrderCheckService } from '../../services/order-check.service';
@Component({
  selector: 'app-success',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public todaysOrders: OrderData[] | null = null;
  public todaysMenu: ReturnMenu = { soup: [], mainMeal: [] };
  public noMenusToday: boolean = false;

  constructor(public router: Router,
              private dateService: DateService,
              private apiService: ApiService,
              private orderCheckService: OrderCheckService) {}

  // Use the public getter method in the template
  get currentDate(): string {
    return this.dateService.currentDate;
  }

  fetchTodaysOrders() {
    this.apiService.checkOrders(this.orderCheckService.today).subscribe(
        (data) => {
          this.todaysOrders = data;
        },
        (error) => {
          console.error("Error fetching today's orders:", error);
        }
    );
  }

  fetchTodaysMenu() {
    const formattedDayOfWeek = this.dateService.formatDayOfWeek();

    // Check if today is a weekend (Saturday or Sunday)
    const dayOfWeek = this.dateService.getDayOfWeek();

    if (dayOfWeek === 0 || dayOfWeek === 6) { // 0 is Sunday, 6 is Saturday
      this.noMenusToday = true;
      this.todaysMenu = { soup: [], mainMeal: [] };
      return;
    }

    // Call method to retrieve the menu for today
    this.apiService.requestMenuForDay(formattedDayOfWeek).subscribe((data: any) => {
      this.todaysMenu = data;
    });
  }

  ngOnInit(): void {
    this.fetchTodaysMenu();
  }

}
