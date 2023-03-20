import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/service';
import { CoreConfigService } from './../../../@core/services/config.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ForgotPasswordModel } from '../models';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  // Public

  public coreConfig: any;
  public forgotPasswordForm: FormGroup;
  public submitted = false;

  // Private
  private _unsubscribeAll: Subject<any>;

  
  constructor(private _coreConfigService: CoreConfigService, private _formBuilder: FormBuilder,
    private _authenticationService:AuthenticationService,
    private router:Router,
    private toastrService:ToastrService) {

    this._unsubscribeAll = new Subject();

    // Configure the layout 
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }

  /**
   * On Submit
   */
  onSubmit(data:ForgotPasswordModel) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    else{
      this._authenticationService.forgotPassword(data).subscribe((data)=>{
        if(data.status == 1){
          this.toastrService.success(data.message)
          this.router.navigate(['/auth/login'])
        }
        else{
          alert("please enter valid email and user type")
        }
      })
    }
  }

 

  ngOnInit(): void {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      user_type:['',[Validators.required]]
    });

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
