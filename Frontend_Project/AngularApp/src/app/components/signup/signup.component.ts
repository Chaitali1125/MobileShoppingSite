import { Component, OnInit } from '@angular/core';
import {UserRegistration} from '../../model/user-registration.model';
import {UserService} from '../../services/user.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})   
export class SignupComponent implements OnInit {
  user:UserRegistration=new UserRegistration();
  message:string="";  
  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
  }
  register() {
    this.user.role=this.user.role.toUpperCase();
    //console.log("User model : "+this.user.name+" "+this.user.email+" "+this.user.role+" "+this.user.password);
    this.userService.addUser(this.user);
  }
}
