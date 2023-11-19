import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private menuUrl = 'http://localhost:8080/swhouse/rest/lunch/all-menu';
  private lunchUrl = 'http://localhost:8080/swhouse/rest/lunch/menu';
  private loginUrl = '/api/swhouse/rest/lunch/login';
  private orderUrl = 'http://localhost:8080/swhouse/rest/lunch/order';
  private listUrl = 'http://localhost:8080/swhouse/rest/lunch/lunch-by-date';
  private changePasswordUrl = 'http://localhost:8080/swhouse/rest/lunch/password';
  private mailUrl = 'http://localhost:8080/swhouse/rest/lunch/mail';

  public selectDay: any;
  constructor(private http: HttpClient) {}

  requestMenuData(): Observable<Menu[]> {
    // Make an API request to retrieve this week's menu
    return this.http.get<{ menus: Menu[] }>(this.menuUrl).pipe(
        map((response) => response.menus)
      );
  }

  requestMenuForDay(selectDay: string): Observable<ReturnMenu[]> {
    // Construct the URL with the "day" parameter as a query parameter
    const urlWithParams = `${this.lunchUrl}?day=${selectDay}`;

    // Make an API request to retrieve the menu for the specified day
    return this.http.get<ReturnMenu[]>(urlWithParams);
  }

  authenticateUser(username: string, password: string): Observable<AuthResponse> {
    // Construct the URL with the 'username' and 'password' query parameters
    const UrlWithParams = `${this.loginUrl}?username=${username}&password=${password}`;

    // Make a request to the authentication API endpoint
    return this.http.get<AuthResponse>(UrlWithParams);
  }

  createOrder(orderData: OrderData): Observable<any> {
    // Define the headers for the POST request
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Make a POST request to send the order data
    return this.http.post(this.orderUrl, orderData, { headers });
  }

  exportOrders(inDate: Date): Observable<OrderData[]> {
    // Construct the URL with the "inDate" parameter as a query parameter
    const urlWithParams = `${this.listUrl}?inDate=${inDate}`;

    // Make an API request to retrieve the list of ordered lunches for the specified date
    return this.http.get<OrderData[]>(urlWithParams);
  }

  checkOrders(inDate: String): Observable<OrderData[]> {
    const urlWithParams = `${this.listUrl}?inDate=${inDate}`;
    return this.http.get<OrderData[]>(urlWithParams);
  }

  changePassword(username: string, newPassword: string): Observable<any> {
    const urlWithParams = `${this.changePasswordUrl}?username=${username}&password=${newPassword}`;
    return this.http.get(urlWithParams);
  }

  sendMail(): Observable<any> {
    return this.http.get(this.mailUrl);
  }
}

// Properties that match the data structure from the API
export interface Menu {
  den: string;
  balenie: string;
  polievka: string;
  jedlo1: string;
  jedlo2: string;
  jedlo3: string;
  jedlo4: string;
}

export interface ReturnMenu {
  soup: string[];
  mainMeal: string[];
}

export interface AuthResponse {
  logged: boolean;
  surname: string;
  name: string;
}

export interface OrderData {
  name: string;
  surname: string;
  date: string;
  soup: string;
  mainMeal: string;
}
