import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product.model';
import { Router } from '@angular/router';
import {ProductService} from '../../services/product.service';
@Component({
  selector: 'app-buyer-home',
  templateUrl: './buyer-home.component.html',
  styleUrls: ['./buyer-home.component.scss']
})
export class BuyerHomeComponent implements OnInit {
  productList:Product[]=[];
  //imageList:any[]=[];
  constructor(private router:Router,public productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts()
    .subscribe((data:Product[])=>{
      this.productList=data;
    });
  };

  getAllCartItem() {
    this.router.navigateByUrl('/mycart');
  }
  // getAllImages(){
  //   for(let i=0;i<this.productList.length;i++){
  //     this.imageList.push(`data:${this.productList[i].image_type};base64,${this.productList[i].image}`);
  //   };
  // }
  addToWallet(){
    this.router.navigateByUrl('/bwallet');
  }
}
