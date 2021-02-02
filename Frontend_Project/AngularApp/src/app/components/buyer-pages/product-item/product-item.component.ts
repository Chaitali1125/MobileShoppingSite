import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../model/product.model'
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: Product=new Product();
  //@Input() imageItem:any;
  constructor( private cartService:CartService) { }

  ngOnInit() {
  }  

  handleAddToCart(id:number) {
    console.log("sending product id to cart table : "+id);
      this.cartService.addProductToCart(id).subscribe(
        response => {
          console.log("responses "+response);
        }
      );    
  }
}
