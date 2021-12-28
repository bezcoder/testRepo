import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ZithapiService } from '../../shared/services/zithapi.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor( public router: Router, public zithapi : ZithapiService) {}
  canActivate(): boolean {
    // if (!this.auth.isAuthenticated()) {
    //   this.router.navigate(['login']);
    //   return false;
    // }
    this.zithapi.getUserRolesKC().subscribe({
        next: data => {
            return true;
        },
        error:error => {
            window.location.reload()

        }
    })
    return true;
  }
}
