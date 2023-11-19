import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private _currentDate: string = '';
  constructor(private datePipe: DatePipe) {

    // Update the current date property upon service instantiation
    this.updateCurrentDate();
  }

  // method to update the _currentDate property with the formatted current date
   updateCurrentDate() {
      // Use Angular DatePipe to format the current date
      const formattedDate = this.datePipe.transform(new Date(), 'fullDate');

      // Check if the formatted date is not null before assignment
      if (formattedDate !== null) {
          this._currentDate = formattedDate;
      } else {
          // Check if the formatted date is not null before assignment
          console.error('DatePipe returned null.');
      }
  }

    // Public getter method to provide controlled access to current date
    get currentDate(): string {
      return this._currentDate;
    }

    // method to format the current date into format "MONDAY"
    formatDayOfWeek(): string {
        const dayOfWeek = this.datePipe.transform(new Date(), 'EEEE');
        return dayOfWeek !== null ? dayOfWeek.toUpperCase() : '';
    }

    // method to determine day of the week
    getDayOfWeek(): number {
        const currentDate = new Date(this.currentDate);
        return currentDate.getDay();
    }

    calculateDateFromDayOfWeek(selectedDay: string): string {
        const today = new Date();

        // Adjust the current day of the week to consider the week reset on Friday midnight
        const currentDayOfWeek = (today.getDay() + 6) % 7;

        const selectedDayIndex = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
            .indexOf(selectedDay);

        const difference = selectedDayIndex - currentDayOfWeek;

        // If the selected day is in the current week, use the current date; otherwise, use the next week
        const targetDate = new Date(today.setDate(today.getDate() + difference + (difference < 0 ? 7 : 0)));

        // Use Angular DatePipe to format the date
        return this.datePipe.transform(targetDate, 'fullDate')!;
        // Adding '!' asserts that the result won't be null
    }

}
