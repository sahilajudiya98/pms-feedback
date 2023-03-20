import { AuthenticationService } from './../../../auth/service/authentication.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {  throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ADD_SLIDER, DELETE_SLIDER, EDIT_SLIDER, GET_SLIDER } from 'app/API_URL/Api_url';


@Injectable({
  providedIn: 'root'
})
export class SliderService {
  @BlockUI() blockUI: NgBlockUI;
  constructor(private _httpClient:HttpClient,
    private authenticationService:AuthenticationService,
    private toastrService:ToastrService) { }

  // Insert Slider User Api
public inserSlider(request:any) {
  this.blockUI.start('Loading...');
  let headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'multipart/form-data');

  
  return this._httpClient.post(ADD_SLIDER,request,{headers :headers }).pipe(
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

// for getting slider
public getSlider(queryParams) {
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

  return this._httpClient.get(GET_SLIDER,{ params }).pipe(
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



// delete slider
 public deleteSlider(id) {
  this.blockUI.start('Loading...');

  return this._httpClient.delete(DELETE_SLIDER+id).pipe(
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

  // Edit Slider User Api
  public editSlider(id,request:any) {
    this.blockUI.start('Loading...');
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'multipart/form-data');
  
    
    return this._httpClient.put(EDIT_SLIDER+id,request,{headers :headers }).pipe(
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
