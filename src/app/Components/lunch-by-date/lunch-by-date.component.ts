import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { ApiService, OrderData } from '../../services/api.service';
@Component({
  selector: 'app-lunch-by-date',
  templateUrl: './lunch-by-date.component.html',
  styleUrls: ['./lunch-by-date.component.css']
})

export class LunchByDateComponent {

  selectedDate: Date;
  orderedLunches: OrderData[] | null = null;

  constructor(public router: Router, private apiService: ApiService) {
    this.selectedDate = new Date();
  }

  fetchOrderedLunches() {
    this.apiService.exportOrders(this.selectedDate).subscribe(
      (data) => {
        this.orderedLunches = data;
      },
      (error) => {
        console.error('Error fetching ordered lunches:', error);
      }
    );
  }
}



