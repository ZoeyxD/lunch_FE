import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { OrderData, ApiService } from '../../services/api.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  selectedDate: Date = new Date();

  orderData: OrderData = {
    name: '',
    surname: '',
    date: '',
    soup: '',
    mainMeal: ''
  };

  constructor(public router: Router, private apiService: ApiService) {
  }

  onSubmit() {
    const selectedDate = new Date(this.selectedDate);

    // Check if the selected date is a weekend (Saturday or Sunday)
    const dayOfWeek = selectedDate.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) { // 0 is Sunday, 6 is Saturday
      window.alert('Sorry, ordering lunch on weekends is not possible.');
      return; // Do not proceed with submitting the order
    }

    // Check if the selected date is in the past
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current date to midnight for accurate comparison

    if (selectedDate < currentDate) {
      window.alert('Sorry, ordering lunch on previous days is not possible.');
      return;
    }

    // Order submission logic
    if (this.selectedDate) {
      this.orderData.date = this.selectedDate.toString();
    }

    // Use the orderData object in the API request
    this.apiService.createOrder(this.orderData).subscribe(
      (response) => {
        window.alert('Order submitted successfully');
      },
      (error) => {
        window.alert('Error submitting order: ' + error.message);
      }
    );
  }
}


