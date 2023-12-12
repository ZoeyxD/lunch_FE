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
              private orderCheckService: CheckerService,
              private dateService: DateService) {}

  ngOnInit() {
    this.currentDate = this.dateService.formatTodayDate();
    this.orderCheckService.hasOrderedLunchesForToday$.subscribe(
        (hasOrderedLunches) => {
          this.hasOrderedLunchesForToday = hasOrderedLunches;
        }
    );
  }

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
