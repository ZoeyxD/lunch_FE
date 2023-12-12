import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private _currentDate: string = '';
  constructor(private datePipe: DatePipe) {}

  // method to get today's date in the desired format
  formatTodayDate(): string {
    const todayDate = new Date();
    todayDate.setDate(todayDate.getDate());
    return this.datePipe.transform(todayDate, 'EEEE, MMMM d, y') || '';
  }

  // method to get tomorrow's date in desired format
  formatTomorrowDate(): string {
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    return this.datePipe.transform(tomorrowDate, 'EEEE, MMMM d, y') || '';
  }


  // method to format the current date into format "EEEE" i.e. "MONDAY"
  formatDayOfWeek(isTomorrow: boolean = false): string {
    const targetDate = isTomorrow ? new Date(new Date().getTime() + 24 * 60 * 60 * 1000) : new Date();
    const dayOfWeek = this.datePipe.transform(targetDate, 'EEEE');
    return dayOfWeek !== null ? dayOfWeek.toUpperCase() : '';
  }

  // method to determine day of the week
  getDayOfWeek(): number {
        const currentDate = new Date();
        return currentDate.getDay();
  }

  /* method to reset the week on friday
  -> prevents displaying this week's menu during weekends (menu-by-day), displays next week instead */
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
    return this.datePipe.transform(targetDate, 'fullDate')!; // Adding '!' asserts that the result won't be null
  }
}
