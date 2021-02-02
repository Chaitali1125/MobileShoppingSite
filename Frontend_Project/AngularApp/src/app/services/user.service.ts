import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { UserRegistration } from '../model/user-registration.model';
import { User } from '../model/user.model'
import { Login } from '../model/login.model';
import { Router } from '@angular/router';
import { Address } from '../model/address.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User = new User();
  user_id: number = 0;
  user_role: string = "";
  message:string="";
  private baseUrl = 'http://localhost:8080/mobileapp/api/user';
  private baseUrl2 = 'http://localhost:8080/mobileapp/api/address/addresses';

  constructor(private router: Router, private http: HttpClient) { }

  addUser(dto: UserRegistration){
    this.http.post<any>(this.baseUrl + '/signup', dto, { headers: { responseType: "text" } }).subscribe();
    this.router.navigateByUrl('/login');
  } 

  authenticate(req: Login): Observable<String> {
    return this.http.post<any>(this.baseUrl + '/login', req).pipe(map(jwt => {
      window.localStorage.jwt = jwt["jwt"];
      console.log(localStorage.getItem("jwt"));
      return jwt;
    }));
    
  }
  getUser(){
    this.http.get<any>(this.baseUrl + '/getuserfromtoken', {
        headers: {
          'Authorization': "bearer " + localStorage.getItem("jwt")
        }
      }).subscribe(
        response => {
          this.user_id = response.id,
            this.user_role = response.role,
            //LOCAL STORAGE
            window.localStorage.user_id = response.id,
            window.localStorage.user_role = response.role,
            console.log("ID : " + localStorage.user_id),
            console.log("ROLE : " + localStorage.user_role)
            console.log("Role in login compo : "+localStorage.user_role);
        if(localStorage.user_role === 'ADMIN'){
          this.router.navigateByUrl('/admin');
        }else{
          this.router.navigateByUrl('/buyer');
        }
        }   
      );
  }

  getUserById(){
    return this.http.get<User>(this.baseUrl+'/'+localStorage.user_id, {
      headers: {
        'Authorization': "bearer " + localStorage.getItem("jwt")
      }
    });
  }

  getUserAddresses(){
    return this.http.get<Address[]>(this.baseUrl2+'/'+localStorage.user_id, {
      headers: {
        'Authorization': "bearer " + localStorage.getItem("jwt")
      }
    });
  }

  isUserLoggedIn(): boolean {
    let flag = true;
    if (window.localStorage.getItem("userDtls") === null)
      flag = false;
    console.log(`flag=${flag}`);
    return flag;
  }

  logout(): void {
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("user_role");
    window.localStorage.removeItem("CartId");
    window.localStorage.removeItem("jwt");
    window.alert("Thank you !!! Please visit again.")
  }

  updatePhone(phoneNumber: String) {
    const userId = window.localStorage.userId;
    return this.http.put(
      this.baseUrl + `/changephone/${userId}`,
      phoneNumber,
      {
        headers: new HttpHeaders({
          'Authorization': "Bearer " + window.localStorage.getItem("jwt")
        })
      }
    );
  }

  updatePassword(password: object) {
    const userId = window.localStorage.userId;
    return this.http.put(
      this.baseUrl + `/updatepassword/${userId}`,
      password,
      {
        headers: new HttpHeaders({
          'Authorization': "Bearer " + window.localStorage.getItem("jwt")
        })
      }
    );
  }

  changeEmail(email: object) {
    const userId = window.localStorage.userId;
    return this.http.put(
      this.baseUrl + `/changeemail/${userId}`,
      email,
      {
        headers: new HttpHeaders({
          'Authorization': "Bearer " + window.localStorage.getItem("jwt")
        })
      }
    );
  }

  changeAddress(address: object) {
    const userId = window.localStorage.userId;
    return this.http.put(
      this.baseUrl + `/updateaddress/${userId}`,
      address,
      {
        headers: new HttpHeaders({
          'Authorization': "Bearer " + window.localStorage.getItem("jwt")
        })
      }
    );
  }

  changePassword(password: string) {
    return this.http.put(
      this.baseUrl + `/changepassword/`, password);
  }

  forgotPassword(data: object) {
    return this.http.post(
      this.baseUrl + `/forgotpassword/`, data);
  }
}