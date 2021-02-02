import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';
import {User} from '../../model/user.model';
import {Address} from '../../model/address.model';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  ordered:string="";
  user:User=new User();
  address:Address[]=[];
  constructor(private router:Router,private orderService:OrderService,private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUserById().subscribe(response=>{
      console.log("User :"+response.name);
      this.user=response;
    });
    this.getAdd();
  }
  getAdd(){
    this.userService.getUserAddresses().subscribe(response=>{
      console.log("Address :"+response[0].apartment);
      this.address=response;
    });
  }
  placeOrder(){
    this.orderService.placeOrder();
    //.subscribe(response=>{
    //   this.ordered=response;
    //   window.alert("Hello "+this.user.name+". Your order is placed.\nYour order will be delivered in 10 working days.")
    //   this.router.navigateByUrl('/buyer');
    // });
  }
}
