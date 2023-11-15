import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent {
  constructor(public router: Router, private apiService: ApiService, private dateService: DateService) {}

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

  // Use the public getter method in the template
  get currentDate(): string {
    return this.dateService.currentDate;
  }

}
