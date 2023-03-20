import { Department } from './../../comman/Department.enum';
import { AuthenticationService } from 'app/auth/service';
import { Role } from 'app/auth/models';
import {  Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private router:Router) { }


  // set item in local storage and don't use this in any component
  currentUserDeatil(){
    const currentuser= JSON.parse(localStorage.getItem("currentUser"))
    currentuser.role = Role[currentuser.user_type];
    currentuser.department = Department[currentuser.department]
    localStorage.setItem("currentUser",JSON.stringify(currentuser))
    return currentuser
  }

  // use this function to get data from local storage
  currentUser(){
    const currentuser= JSON.parse(localStorage.getItem("currentUser"))
    return currentuser
  }


  token(){
    return localStorage.getItem('token')
  }

  
// once login then we not able to open login and register
  pageAuth(){
    if(this.token()){
      this.router.navigate(['/'])
    }
  }

}
