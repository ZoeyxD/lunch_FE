import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CheckerService } from '../../services/checker.service';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  hasOrderedLunchesForToday: boolean= false;
  public currentDate: string = '';


  constructor(public router: Router,
              private apiService: ApiService,
              private checkerService: CheckerService,
              private dateService: DateService) {}



  ngOnInit() {
    //retrieves current date from DateService
    this.currentDate = this.dateService.formatTodayDate();
    //checks whether there are any orders for today
    this.checkerService.hasOrderedLunchesForToday$.subscribe(
        (hasOrderedLunches) => {
          this.hasOrderedLunchesForToday = hasOrderedLunches;
        }
    );
  }

  // Method to check if the current time is before 10:30am
  isMorning(): boolean {
    return this.checkerService.isMorning();
  }


  //method to make API request to send email with previously ordered lunches
  sendMail() {
      this.apiService.sendMail().subscribe(
        (response) => {
          // Handle success, show a success message or redirect.
          window.alert('Email sent successfully');
        },
        (error) => {
          // Handle errors, show an error message.
          console.error('Error sending email:', error);
          window.alert('Error sending email: ' + error.message);
        }
      );
  }

}
