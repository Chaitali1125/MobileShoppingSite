import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AddMobileComponent } from './components/admin-pages/add-mobile/add-mobile.component';
import { RemoveMobileComponent } from './components/admin-pages/remove-mobile/remove-mobile.component';
import { ProductItemComponent } from './components/buyer-pages/product-item/product-item.component';
import { BuyerHomeComponent } from './components/buyer-home/buyer-home.component';
import { GetCartComponent } from './components/buyer-pages/get-cart/get-cart.component';
import { RemoveItemComponent } from './components/buyer-pages/remove-item/remove-item.component';
import { BuyerWalletComponent } from './components/buyer-pages/buyer-wallet/buyer-wallet.component';
import { OrderComponent } from './components/order/order/order.component';
import { AdminWalletComponent } from './components/admin-pages/admin-wallet/admin-wallet.component';
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},  
  {path: 'signup', component: SignupComponent},
  {path: 'product', component: ProductComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'forgotpassword', component: ForgotpasswordComponent},
  {path: 'changepassword', component: ChangepasswordComponent},
  {path: 'admin', component: AdminHomeComponent},
  {path: 'add' , component:AddMobileComponent},
  {path: 'delete' , component:RemoveMobileComponent},
  {path: 'cart' , component:CartComponent},
  {path: 'productitem' , component:ProductItemComponent},
  {path: 'buyer' , component:BuyerHomeComponent},
  {path: 'mycart' , component:GetCartComponent},
  {path: 'remove' , component:RemoveItemComponent},
  {path: 'bwallet' , component:BuyerWalletComponent},
  {path: 'order' , component:OrderComponent},
  {path: 'awallet' , component:AdminWalletComponent}
];       

@NgModule({   
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
