import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DateService } from '../../services/date.service';
@Component({
  selector: 'app-success',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public router: Router, private dateService: DateService) {}

  // Use the public getter method in the template
  get currentDate(): string {
    return this.dateService.currentDate;
  }
}
