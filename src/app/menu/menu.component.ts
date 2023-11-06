import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

import { Menu } from '../services/api.service'; // Import the Menu interface from menu.service

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu: Menu[] = [];
  constructor(public router: Router, private apiService: ApiService) {}

  ngOnInit() {
    //A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive
    //handles additional initialization tasks

    // Call the getMenuData method to retrieve this week's menu
    this.getMenuData();
  }


  getMenuData() {
    // Call the menuService method to retrieve this week's menu
    this.apiService.requestMenuData().subscribe((data) => {

      // Assign the fetched data to the 'menu' property, which will be used in the template
      this.menu = data;
    })
  }
}
