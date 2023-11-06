import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { OrderData, ApiService } from '../services/api.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  // Define a property to hold the user-selected date
  selectedDate: Date = new Date();

  // Create an empty orderData object with initial values
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

    if (this.selectedDate) {
      this.orderData.date = this.selectedDate.toString();
    }

    // Use the orderData object, which contains the actual order data
    this.apiService.createOrder(this.orderData).subscribe(
      (response) => {
        // Handle success, e.g., show a success message
        window.alert('Order submitted successfully');
      },
      (error) => {
        // Handle errors, e.g., show an error message
        window.alert('Error submitting order: ' + error.message);
      }
    );
  }
}


