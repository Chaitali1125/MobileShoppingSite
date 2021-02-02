import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { UserRegistration } from '../model/user-registration.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8080/mobileapp/api/order';

  constructor(private router: Router, private http: HttpClient) { }

  placeOrder(){
    this.http.post<string>(this.baseUrl + '/add/'+localStorage.user_id,null, {
      headers: {
        'Authorization': "bearer " + localStorage.getItem("jwt")
      }
    }).subscribe();
    window.alert("Hello..Your order is placed.\nYour order will be delivered in 10 working days.")
    this.router.navigateByUrl('/buyer');
  } 
}
