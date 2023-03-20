import { User_Type } from './../../../comman/User_Type.enum';
import { AuthenticationService } from 'app/auth/service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { GET_USERLIST } from 'app/API_URL/Api_url';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  @BlockUI() blockUI: NgBlockUI;


  constructor(private _httpClient:HttpClient,
    private authenticationService:AuthenticationService,
    private toastrService:ToastrService) { }

    // get user list

  public userList(queryParams?: { [param: string]: any }) {
    this.blockUI.start('Loading...');

    let params = new HttpParams();
    if (queryParams) {
      for (const key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
          if(!queryParams[key]){
            continue
          }
          else{
            params = params.set(key, queryParams[key]);
          }
          
        }
      }

    }

    return this._httpClient.get(GET_USERLIST,{ params }).pipe(
      map((res: any) => {
        
        res.data.data.map((item) => {
          return item['user_type']= User_Type[item['user_type']]
      })
      this.blockUI.stop();
      this.toastrService.success("",res.message, { toastClass: 'toast ngx-toastr', closeButton: true })
        return res;
      }),
      catchError(error => {
        this.blockUI.stop();
        this.authenticationService.commonErrorHandler(error);
        return throwError(error);
      })
    );
  }
  
}
