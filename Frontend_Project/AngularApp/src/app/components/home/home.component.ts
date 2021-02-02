import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ngOnInit() {
  }
/*
  @Input() productItem: Product

  constructor(private msg: MessengerService , private cartService:CartService) { }

  ngOnInit() {
  }ass

  handleAddToCart() {
    this.cartService.addProductToCart(this.productItem).subscribe(() => {
    this.msg.sendMsg(this.productItem)
    })
    
  }*/

}
