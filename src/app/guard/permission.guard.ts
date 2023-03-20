import { permission } from "./../comman/permisssion.const";
import { HelperService } from "./../auth/service/helper.service";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class PermissionGuard implements CanActivate {
  constructor(private _helperService: HelperService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentPagePath = route.routeConfig.path;
    const currentUserRole = this._helperService.currentUser().role;
    const currentUserDepartment = this._helperService.currentUser().department;

    const pathMatch = permission.map((data)=>Object.entries(data).filter((data)=>data[0]==currentPagePath));
    const roleMatch = pathMatch.filter((data)=>data.length>0)[0][0][1].role.includes(currentUserRole);
    const departmentMacth = pathMatch.filter((data)=>data.length>0)[0][0][1].department.includes(currentUserDepartment);

    // const isAuthenticated = permission.map((data) =>
    //   Object.entries(data)
    //     .filter((data) => data[0] == currentPagePath)
    //     ?.map((data) => data[1].filter((data) => data == currentUserRole))
    // )[0][0];


    if (roleMatch && departmentMacth) {
      return true;
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }
}
