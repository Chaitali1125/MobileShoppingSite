import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../../services/order.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  ordered:string="";
  constructor(private router:Router,private orderService:OrderService) { }
  
  ngOnInit(): void {
  }

  placeOrder(){
    this.orderService.placeOrder();
  }
}
