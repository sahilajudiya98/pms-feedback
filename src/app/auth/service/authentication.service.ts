import { Status } from './../../comman/status.enum';
import { Router } from "@angular/router";
import { HelperService } from "./helper.service";
import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

import { User, Role } from "app/auth/models";
import { FORGOTPASSWORD, USER_LOGIN, USER_SIGNUP } from "app/API_URL/Api_url";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  @BlockUI() blockUI: NgBlockUI;
  //public
  public currentUser: Observable<User>;

  //private
  public currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(
    private _httpClient: HttpClient,
    private toastrService: ToastrService,
    private helperService: HelperService,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.getActiveUser();
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return (
      this.currentUser && this.currentUserSubject.value.role === Role.Admin
    );
  }

  /**
   *  Confirms if user is client
   */
  // get isClient() {
  //   return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  // }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */

  login() {}

  logout() {
    // remove user from local storage to log user out
    // notify
    // this.currentUserSubject.next(null);
    localStorage.clear();
  }

  getActiveUser() {
    let currentUser: User;
    return currentUser;
  }

  // Api -------------------------------------------------------------------------------

  // register user api
  public insertUser(body: any) {
    this.blockUI.start("Loading...");
    return this._httpClient.post(USER_SIGNUP, body).pipe(
      map((res: any) => {
        this.blockUI.stop();
        return res;
      }),
      catchError((error) => {
        this.commonErrorHandler(error);
        return throwError(error);
      })
    );
  }

  // Login User Api
  public getUser(request: any) {
    this.blockUI.start("Loading...");
    return this._httpClient.post(USER_LOGIN, request).pipe(
      map((res: any) => {
        if (res.status == 1) {
          this.blockUI.stop();
          localStorage.setItem("currentUser", JSON.stringify(res.data.user));
          
          const currentUser = this.helperService.currentUserDeatil();
          this.currentUserSubject.next(currentUser);
          localStorage.setItem("token", res.data.token);
          this.toastrService.success("", res.message, {
            toastClass: "toast ngx-toastr",
            closeButton: true,
          });
          this.router.navigate(["/"]);
          return res;
        }
      }),
      catchError((error) => {
        this.blockUI.stop();
        this.commonErrorHandler(error);
        return throwError(error);
      })
    );
  }

  public forgotPassword(request: any) {
    this.blockUI.start("Loading...");
    return this._httpClient.post(FORGOTPASSWORD, request).pipe(
      map((res: any) => {
        this.blockUI.stop();
        return res;
      }),
      catchError((error) => {
        this.blockUI.stop();
        this.commonErrorHandler(error);
        return throwError(error);
      })
    );
  }

  public commonErrorHandler(error) {
    this.toastrService.error("", error.error.message, {
      toastClass: "toast ngx-toastr",
      closeButton: true,
    });



    // if (error.status=== 404) {
    //   this.toastrService.error(error.error.message)
    // }
    if (error.status === 401) {
    //  this.logout();
    //  this.router.navigate(['/']);
    }
  }
}
