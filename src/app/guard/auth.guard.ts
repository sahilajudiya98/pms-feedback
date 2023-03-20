import { HelperService } from './../auth/service/helper.service';
import { AuthenticationService } from './../auth/service/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {



  constructor(private AuthService:AuthenticationService, private Router:Router,
    private helperService:HelperService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {

    if(this.helperService.token() == null || this.helperService.token() == undefined){
      this.Router.navigate(['/auth/login'])
      return false
    }
    else{
      return true
    }
    
    


}
}
