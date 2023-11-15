import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './Components/menu/menu.component';
import { ReturnMenuComponent } from './Components/return-menu/return-menu.component';
import { OrderComponent } from './Components/order/order.component';
import { LunchByDateComponent } from './Components/lunch-by-date/lunch-by-date.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { MailComponent } from './Components/mail/mail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCircle } from '@fortawesome/free-solid-svg-icons';
import {NgOptimizedImage,DatePipe} from "@angular/common";

library.add(faUser, faCircle);

const routes = [
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'return-menu', component: ReturnMenuComponent },
  { path: 'order', component: OrderComponent },
  { path: 'lunch-by-date', component: LunchByDateComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'mail', component: MailComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    ReturnMenuComponent,
    OrderComponent,
    LunchByDateComponent,
    SettingsComponent,
    MailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgOptimizedImage
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
