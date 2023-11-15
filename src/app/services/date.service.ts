import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private _currentDate: string = '';

  constructor(private datePipe: DatePipe) {
    this.updateCurrentDate();
  }

  private updateCurrentDate() {
    const formattedDate = this.datePipe.transform(new Date(), 'fullDate');
    if (formattedDate !== null) {
      this._currentDate = formattedDate;
    } else {
      console.error('DatePipe returned null.');
    }
  }

  // Public getter method for currentDate
  get currentDate(): string {
    return this._currentDate;
  }

}
