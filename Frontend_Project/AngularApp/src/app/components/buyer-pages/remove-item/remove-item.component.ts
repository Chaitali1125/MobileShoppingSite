import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-remove-item',
  templateUrl: './remove-item.component.html',
  styleUrls: ['./remove-item.component.scss']
})
export class RemoveItemComponent{

  id:any=window.localStorage.getItem("CartId");
  constructor(private router:Router,private cartService:CartService) { }
  deleteitem(id:number){
    this.cartService.deleteItem(this.id)
    .subscribe();
    this.router.navigateByUrl('/mycart');
  };

}
