import { HelperService } from './../../auth/service/helper.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private helperService:HelperService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string =this.helperService.token()

    const contenttype = request.headers.get('Content-Type')
    // console.log(request.headers.get('Content-Type'),"request")
    if(token){
      if(contenttype){
        const authReq = request.clone({
          headers: new HttpHeaders(
            {
            'Authorization': 'Bearer ' +token
          })
        });
        return next.handle(authReq);
      }
      else{
        const authReq = request.clone({
          headers: new HttpHeaders(
            {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer ' +token
          })
        });
        return next.handle(authReq);
      }

   
    
    }
    else{
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    return next.handle(request);
    }
  }
}
