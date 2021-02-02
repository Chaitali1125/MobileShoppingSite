import { Component, OnInit } from '@angular/core';
import {AddProduct} from '../../../model/add-product.model';
import {ProductService} from '../../../services/product.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-mobile',
  templateUrl: './add-mobile.component.html',
  styleUrls: ['./add-mobile.component.scss']
})
export class AddMobileComponent implements OnInit {
  addProduct:AddProduct=new AddProduct();
  image ! : File;
  message:string="";
  constructor(private router:Router,private productService:ProductService) {
    
   }

  ngOnInit(): void {
  }
  public onFileChanged(event:any) {
    console.log(event);
    this.image = event.target.files[0];
  }
  //event handler function called when Upload btn is clicked
  onUpload() {
    console.log("Product data : "+this.addProduct.description);
    this.productService.uploadFile(this.image,this.addProduct).subscribe(
      response => {
        console.log(response);
        this.message = response.toString();
        this.router.navigateByUrl('/admin');
      }
    );
  }
  backToHome(){
    this.router.navigateByUrl('/admin');
  }

}
