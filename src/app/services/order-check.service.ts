import {Injectable} from '@angular/core';
import {ApiService, OrderData} from './api.service';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderCheckService {

  private _hasOrderedLunchesForTodaySource = new BehaviorSubject<boolean>(false);
  hasOrderedLunchesForToday$ = this._hasOrderedLunchesForTodaySource.asObservable();

  today: string = "";

  constructor(private apiService: ApiService) {
    // Get the current date
    const currentDate = new Date();

    // Format the date as yyyy-mm-dd
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);

    // Assign the formatted date to the 'today' variable
    this.today = `${year}-${month}-${day}`;

    // Check if there are ordered lunches for today
    this.checkOrderedLunchesForToday();
  }

  checkOrderedLunchesForToday() {
    this.apiService.checkOrders(this.today).subscribe(
        (data: OrderData[]) => {
          const hasOrderedLunches = data !== null && data.length > 0;
          this._hasOrderedLunchesForTodaySource.next(hasOrderedLunches);
        },
        (error) => {
          console.error('Error fetching ordered lunches:', error);
        }
    );
  }
}
