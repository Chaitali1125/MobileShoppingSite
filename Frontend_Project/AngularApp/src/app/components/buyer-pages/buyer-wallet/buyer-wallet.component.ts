import { Component, OnInit } from '@angular/core';
import {Wallet} from '../../../model/wallet.model';
import {WalletService} from '../../../services/wallet.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-buyer-wallet',
  templateUrl: './buyer-wallet.component.html',
  styleUrls: ['./buyer-wallet.component.scss']
})
export class BuyerWalletComponent implements OnInit {
  //wallet:Wallet=new Wallet();
  initialAmount:number=0;
  amount:number=0;
  message:string="";
  constructor(private router:Router,private walletService:WalletService) { }

  ngOnInit(): void {
    this.walletService.getWallet()
    .subscribe(data=>{
      this.initialAmount=data;
      console.log("In buyer wallet component Amount : "+this.initialAmount);
    });
  };
  updateWallet(){
    console.log("In update buyer wallet component : "+this.amount);
    this.walletService.addToWallet(this.amount).subscribe(data=>{
    this.message=data.toString();
    console.log("message : "+this.message);
    });
  };
  backToHome(){
    this.router.navigateByUrl('/buyer');
  }
}  
