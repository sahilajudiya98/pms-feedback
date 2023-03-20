import { HelperService } from './../service/helper.service';
import { AuthenticationService } from './../service/authentication.service';
import { CoreConfigService } from './../../../@core/services/config.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchPassword } from 'app/shared/validators/password_match';
import { strong_password } from 'app/shared/validators/strong_password';
import { RegisterUserModel } from '../models';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

 

  signupForm:FormGroup;
  public submitted = false;


  constructor(private formBuilder: FormBuilder, private router:Router,
    private _coreConfigService:CoreConfigService,
    private _authenticationService:AuthenticationService,
    private _helperService:HelperService,
    private _toastrService:ToastrService) {

    this.signupForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['', [Validators.required,strong_password,Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required]],
      company: ['', [Validators.required]],
    },{ validator: matchPassword('password', 'confirmpassword') })

    
// for hide the navbar and header and footer
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        menu: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        customizer: false,
        enableLocalStorage: false,
      },
    };

// once login then we not able to open login and register 
  this._helperService.pageAuth()

   }

   
   get f() {
    return this.signupForm.controls;
  }
  ngOnInit(): void {
  }


  signupform(data:RegisterUserModel){

    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }
    else{
      if(this.signupForm.valid){
        this._authenticationService.insertUser(data).subscribe((data: any) =>{
        
          if(data.status == 1){
            this.router.navigate(['auth/login'])
          }
          else{
            this._toastrService.success("",data.message, { toastClass: 'toast ngx-toastr', closeButton: true })
          }
          }, error => {
            return throwError(error)
          })
        // this.signupForm.reset()
        }
    }  
  }



}
