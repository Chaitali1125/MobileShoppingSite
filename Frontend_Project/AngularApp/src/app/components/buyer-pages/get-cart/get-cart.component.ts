import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../services/cart.service';
import {Cart} from '../../../model/cart.model'
import { Router } from '@angular/router';
@Component({
  selector: 'app-get-cart',
  templateUrl: './get-cart.component.html',
  styleUrls: ['./get-cart.component.scss']
})
export class GetCartComponent implements OnInit {
  cartList:Cart[]=[];
  message:string="";
  constructor(private router:Router,private cartService:CartService) { }

  // ngOnInit(): void {
  //   this.cartService.getAllCartItem()
  //   .subscribe((data:Cart[])=>{
  //     this.cartList=data;
  //   });
  // };
  ngOnInit(): void {
    this.cartService.getAllCartItem()
    .subscribe(data=>{
      this.cartList=data;
    },
    error=>{
      this.message=error;
    }
    );
  };
  
  remove(id:number){
    window.localStorage.setItem("CartId",id.toString());
    this.router.navigateByUrl('/remove');
  }
}
