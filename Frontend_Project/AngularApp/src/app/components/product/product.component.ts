import { Component, OnInit } from '@angular/core';
import {AddProduct} from '../../model/add-product.model';
import {UserService} from '../../services/user.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  addProduct:AddProduct=new AddProduct();
  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
  }
  
}
