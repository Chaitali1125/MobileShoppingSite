import { Component, OnInit } from '@angular/core';
import {WalletService} from '../../../services/wallet.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-wallet',
  templateUrl: './admin-wallet.component.html',
  styleUrls: ['./admin-wallet.component.scss']
})
export class AdminWalletComponent implements OnInit {
  initialAmount:number=0;
  amount:number=0;
  constructor(private router:Router,private walletService:WalletService) { }

  ngOnInit(): void {
    this.walletService.getWallet()
    .subscribe(data=>{
      this.initialAmount=data;
    });
  };

  backToHome(){
    this.router.navigateByUrl('/admin');
  }

}
