import { AuthenticationService } from 'app/auth/service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { CREATE_ADMIN, DELETE_ADMIN, EDIT_ADMIN, GET_ADMILIST } from 'app/API_URL/Api_url';


@Injectable({
  providedIn: 'root'
})
export class AdminListService {
  @BlockUI() blockUI: NgBlockUI;
  editAdminData = new BehaviorSubject({})
  refreshdata = new BehaviorSubject(false)

  constructor(private _httpClient:HttpClient,
    private authenticationService:AuthenticationService,
    private toastrService:ToastrService) { }

    // get all admin list

    public adminList(queryParams?: { [param: string]: any }) {
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
  
      return this._httpClient.get(GET_ADMILIST,{ params }).pipe(
        map((res: any) => {
          this.toastrService.success("",res.message, { toastClass: 'toast ngx-toastr', closeButton: true })
        this.blockUI.stop();
          return res;
        }),
        catchError(error => {
          this.blockUI.stop();
          this.authenticationService.commonErrorHandler(error);
          return throwError(error);
        })
      );
    }

// create admin
    public createAdmin(request:any) {
      this.blockUI.start('Loading...');
  
      return this._httpClient.post(CREATE_ADMIN,request).pipe(
        map((res: any) => {
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


    
// delete Admin
 public deleteAdmin(id) {
  this.blockUI.start('Loading...');

  return this._httpClient.put(DELETE_ADMIN+id,{}).pipe(
    map((res: any) => {
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


 // Edit Admin Api
 public editAdmin(id,request:any) {
  this.blockUI.start('Loading...');
  return this._httpClient.put(EDIT_ADMIN+id,request).pipe(
    map((res: any) => {
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
