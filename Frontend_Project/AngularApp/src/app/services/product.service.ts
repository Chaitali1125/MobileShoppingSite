import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {AddProduct} from '../model/add-product.model';
import {Product} from '../model/product.model';
import {User} from '../model/user.model'
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  currentUser:User=JSON.parse(JSON.stringify(localStorage.getItem("current_user")));
  baseURL: string = "http://localhost:8080/mobileapp/api/product";

  constructor(private http: HttpClient) { }
  uploadFile(imageFile: File,addProduct:AddProduct) {
    const uploadData = new FormData();
    uploadData.append("image", imageFile);
    console.log(`sending ${addProduct}`);
  //  const userDtls=new UserDetails("madhura@gmail",27);
   // uploadData.append("dtls", "{'email' : 'rama@gmail.com','age' : 27}");
   console.log("Product data : "+JSON.stringify(addProduct));
   uploadData.append("data",JSON.stringify(addProduct));
   return this.http.post(this.baseURL+'/add/'+localStorage.user_id, uploadData,{ headers:{
    'Authorization' : "bearer " + localStorage.getItem("jwt")
  }});
  }    
      
  retrieveImage(userId:number) {
    console.log("sending " + `${this.baseURL}download/${userId}`);
    return this.http.get<any>(this.baseURL+'/');
// return this.http.get<any>(`${this.baseURL}download/2`);
  }

  public getProductsById(){
      return this.http.get<Product[]>(this.baseURL+'/unsold/'+localStorage.user_id,{ headers:{
        'Authorization' : "bearer " + localStorage.getItem("jwt")
      }});
  }

  public deleteProduct(id:number){
    return this.http.delete(this.baseURL+'/delete/'+id,{ headers:{
        'Authorization' : "bearer " + localStorage.getItem("jwt")
      }});
  }

  public getAllProducts(){
    console.log("In product service");
    return this.http.get<Product[]>(this.baseURL+'/getall',{ headers:{
      'Authorization' : "bearer " + localStorage.getItem("jwt")
    }});
}
}
