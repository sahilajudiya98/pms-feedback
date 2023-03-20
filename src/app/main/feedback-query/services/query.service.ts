import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CURRENT_USER_FEEBBACK_LIST, DELETE_FEEDBACK, FEEBBACK_CREATE, FEEDBACK_ASSIGN_LIST, FEEDBACK_REASSIGN_MEMBERLIST, FEEDBACK_REASSIGN_TO_MEMBER, GET_ALLFEEBBACK_LIST, UPDATE_FEEDBACK } from 'app/API_URL/Api_url';
import { AuthenticationService } from 'app/auth/service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  @BlockUI() blockUI: NgBlockUI;
  constructor(private _httpClient:HttpClient,
    private authenticationService:AuthenticationService,
    private toastrService:ToastrService) { }

    // create query
  public createQuery(request:any) {
    this.blockUI.start('Loading...');

    return this._httpClient.post(FEEBBACK_CREATE,request).pipe(
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


  // get  all query list
  public queryList(queryParams?: { [param: string]: any }) {
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

    return this._httpClient.get(GET_ALLFEEBBACK_LIST,{ params }).pipe(
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


  //  get cureent user query list
  public queryListUser(queryParams?: { [param: string]: any }) {
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

    return this._httpClient.get(CURRENT_USER_FEEBBACK_LIST,{ params }).pipe(
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

// update status of query
  public updateQueryStatus(id,request:any) {
    this.blockUI.start('Loading...');

    return this._httpClient.patch(UPDATE_FEEDBACK+id,request).pipe(
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




  // delete query
  
 public deleteQuery(id) {
  this.blockUI.start('Loading...');

  return this._httpClient.delete(DELETE_FEEDBACK+id).pipe(
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

  // role vise assign query list get
  public assignQueryList(queryParams?: { [param: string]: any }) {
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

    return this._httpClient.get(FEEDBACK_ASSIGN_LIST,{ params }).pipe(
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

  // reassign query to another team member list
  public reassignMemberList(id,request) {
    this.blockUI.start('Loading...');
  
    return this._httpClient.post(FEEDBACK_REASSIGN_MEMBERLIST+id,request).pipe(
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

  // reassign to Member query api(update query status component)
  public reassignQuery(id,request) {
    this.blockUI.start('Loading...');
  
    return this._httpClient.post(FEEDBACK_REASSIGN_TO_MEMBER+id,request).pipe(
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
