import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.auth.isLoggedIn()) {
        this.router.navigate([])
        return false;
      }
      let urlPath = state.url;
      urlPath = urlPath.substring(1,urlPath.length)
      if(this.auth.loginAuth(this.auth.getToken()) === urlPath){
        return true;
      }
      this.router.navigate([this.auth.loginAuth(this.auth.getToken())])
      return false;
      // return this.auth.isLoggedIn();

  }

}
