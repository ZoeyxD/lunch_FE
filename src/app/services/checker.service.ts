import {Injectable} from '@angular/core';
import {ApiService, Menu, OrderData} from './api.service';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckerService {

  private _hasOrderedLunchesForTodaySource = new BehaviorSubject<boolean>(false);
  hasOrderedLunchesForToday$ = this._hasOrderedLunchesForTodaySource.asObservable();

  private _weeklyMenuSource = new BehaviorSubject<Menu[]>([]);
  weeklyMenu$ = this._weeklyMenuSource.asObservable();

  today: string = "";
  tomorrow: string = '';

  constructor(private apiService: ApiService) {
    const currentDate = new Date();
    this.today = this.formatDate(currentDate);

    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    this.tomorrow = this.formatDate(tomorrowDate);

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


  checkMenuAvailability(menu: { soup: any[]; mainMeal: any[] }): boolean {
      //check if menu for selected day contains any data
    return !(menu && (menu.soup.length > 0 || menu.mainMeal.length > 0));
  }

    getWeeklyMenu() {
      // make API request to retrieve this week's menu (all) - this will be used in case no menu on a given day is available
      this.apiService.requestMenuData().subscribe(
            (data) => {
                this._weeklyMenuSource.next(data);
                // item.balenie in Menu[] contains info on why menu is not available -> to be displayed in template instead of menu data
            },
            (error) => {
                console.error('Error fetching weekly menu:', error);
                this._weeklyMenuSource.next([]); // Reset menu data in case of an error
            }
        );
    }

  private formatDate(date: Date): string {
    // Format the date as yyyy-mm-dd
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
