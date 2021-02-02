import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-remove-mobile',
  templateUrl: './remove-mobile.component.html',
  styleUrls: ['./remove-mobile.component.scss']
})
export class RemoveMobileComponent{

  id:any=window.localStorage.getItem("MobileId");
  constructor(private router:Router,private productService:ProductService) { }
  deleteProd(id:number){
    this.productService.deleteProduct(this.id)
    .subscribe();
    this.router.navigateByUrl('/admin');
  };

}
