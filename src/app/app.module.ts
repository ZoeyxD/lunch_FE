import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { ReturnMenuComponent } from './menu/return-menu/return-menu.component';
import { OrderComponent } from './order/order.component';
import { LunchByDateComponent } from './lunch-by-date/lunch-by-date.component';
import { SettingsComponent } from './settings/settings.component';
import { MailComponent } from './mail/mail.component';

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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
