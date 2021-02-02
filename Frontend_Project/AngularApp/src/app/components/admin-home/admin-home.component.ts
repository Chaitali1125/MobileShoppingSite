import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product.model';
import { Router } from '@angular/router';
import {ProductService} from '../../services/product.service'
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  prod:Product[]=[];
  retrivedImage:any[]=[];
  constructor(private router:Router,public productService:ProductService) { }
  
  ngOnInit(): void {
    this.productService.getProductsById()
    .subscribe((data:Product[])=>{
      this.prod=data;
      //this.retrivedImage.push( `data:${prod};base64,${resp.data}`;
    });
  };
  addToWallet(){
    this.router.navigateByUrl('/awallet');
  }

  deleteUser(id:number){
    window.localStorage.setItem("MobileId",id.toString());
    this.router.navigateByUrl('/delete');
  }
}  
