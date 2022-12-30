import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: UserService) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()){
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
