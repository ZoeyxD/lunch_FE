import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { DateService } from '../../services/date.service';
import {OrderData, ApiService, ReturnMenu} from '../../services/api.service';
import { CheckerService } from '../../services/checker.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  selectedDate: Date = new Date();
  noMenuAvailable: boolean = true;

  orderData: OrderData = {
    name: '',
    surname: '',
    date: '',
    soup: '',
    mainMeal: ''
  };

    public menu: ReturnMenu = { soup: [], mainMeal: [] }; // Property to store the menu data

  constructor(public router: Router,
              private apiService: ApiService,
              private checkerService: CheckerService,
              public dateService: DateService) {}


    ngOnInit() {
         this.checkMenu();
     }

    isMorning(): boolean {
        return this.checkerService.isMorning();
    }

    //method to check whether menu is available to order for the selected day
     checkMenu() {
        console.log('Selected Date:', this.selectedDate);

         // Check if the selected date is in the past
         const selectedDate = new Date(this.selectedDate);
         const currentDate = new Date();
         currentDate.setHours(10, 30, 0, 0); // Set current date to 10:30am (deadline for sending orders for given day)

         // if the selected date is in the past (before today 10:30), no menus are available to order
         if (selectedDate < currentDate) {
             this.noMenuAvailable = true;
             return;
         }

        // Convert selected date into day of the week ("EEEE")
        const selectedDay = this.dateService.formatSelectedDayOfWeek(this.selectedDate);
        console.log('Selected Day:', selectedDay);

        // Determine if the selected day is a weekend (Sunday or Saturday)
         const isWeekend = selectedDay === "SATURDAY" || selectedDay === "SUNDAY";

        // If it's a weekend, set noMenuAvailable to true and return
        if (isWeekend) {
             this.noMenuAvailable = true;
             return;
         }

        // Fetch menu for the selected day
        this.apiService.requestMenuForDay(selectedDay).subscribe(
            (data: any) => {
                console.log('Menu for selected day:', data);
                this.menu = data;
                // Use CheckerService method to check if retrieved menu contains any data
                this.noMenuAvailable = this.checkerService.checkMenuAvailability(this.menu);
                console.log('no menu available:', this.noMenuAvailable);
            },
            (error) => {
                console.error('Error fetching menu:', error);
                this.noMenuAvailable = false;
            }
        );
    }

  onSubmit() {
    // converts selected date to string
    if (this.selectedDate) {
      this.orderData.date = this.selectedDate.toString();
    }

    // Use the orderData object in the POST API request
    this.apiService.createOrder(this.orderData).subscribe(
      () => {
        window.alert('Order submitted successfully');
      },
      (error) => {
        window.alert('Error submitting order: ' + error.message);
      }
    );
  }




}


