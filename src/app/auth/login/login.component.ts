import { HelperService } from './../service/helper.service';
import { CoreConfigService } from './../../../@core/services/config.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUserModel } from '../models';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {


  signinForm: FormGroup;
  public submitted = false;
  public passwordTextType: boolean;
  public coreConfig: any;
  private _unsubscribeAll: Subject<any>;


  constructor(private formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _coreConfigService: CoreConfigService,
    private helperService: HelperService,
  ) {

    this._unsubscribeAll = new Subject();

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
    this.helperService.pageAuth()
  }

  ngOnInit(): void {

    this.signinForm = this.formBuilder.group({
      company_email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;

    });
  }

  get f() {
    return this.signinForm.controls;
  }



  // SUBMIT FORM
  signinform(data: LoginUserModel) {
    this.submitted = true;
    if (this.signinForm.invalid) {
      return;
    }
    else {
      this._authenticationService.getUser(data).subscribe((data) => {
      })
    }
  }



  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}


