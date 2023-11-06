import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent {
  constructor(public router: Router, private apiService: ApiService) {}

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
