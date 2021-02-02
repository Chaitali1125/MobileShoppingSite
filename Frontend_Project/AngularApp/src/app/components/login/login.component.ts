import { Component, OnInit } from '@angular/core';
import {Login} from '../../model/login.model';
import {UserService} from '../../services/user.service'
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginuser:Login=new Login();
  invalidLogin:boolean=false;
  //user_id:number=0;
  //user_role:string="";
  currentUser:User=new User();
  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {   
  }

  login() {
    this.userService.authenticate
    (this.loginuser).subscribe(
      response => {
        this.invalidLogin = false;
        this.userService.getUser();
      },
      error => {
        alert("invalid login....");
        this.invalidLogin = true;    
      }
    );
}
}