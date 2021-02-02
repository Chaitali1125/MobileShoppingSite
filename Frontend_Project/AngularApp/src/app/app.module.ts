import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AddMobileComponent } from './components/admin-pages/add-mobile/add-mobile.component';
import { RemoveMobileComponent } from './components/admin-pages/remove-mobile/remove-mobile.component';
import { BuyerHomeComponent } from './components/buyer-home/buyer-home.component';
import { ProductItemComponent } from './components/buyer-pages/product-item/product-item.component';
import { CartService } from './services/cart.service';
import { GetCartComponent } from './components/buyer-pages/get-cart/get-cart.component';
import { RemoveItemComponent } from './components/buyer-pages/remove-item/remove-item.component';
import { OrderComponent } from './components/order/order/order.component';
import { BuyerWalletComponent } from './components/buyer-pages/buyer-wallet/buyer-wallet.component';
import { OrderService } from './services/order.service';
import { AdminWalletComponent } from './components/admin-pages/admin-wallet/admin-wallet.component';
@NgModule({
  declarations: [  
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent,
    AdminHomeComponent,
    AddMobileComponent,
    RemoveMobileComponent,
    BuyerHomeComponent,
    ProductItemComponent,
    GetCartComponent,
    RemoveItemComponent,
    OrderComponent,
    BuyerWalletComponent,
    AdminWalletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService,ProductService,CartService,OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
