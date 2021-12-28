import { HttpClient } from '@angular/common/http';
import { Component, HostBinding } from '@angular/core';
import { ZithapiService } from '../../shared/services/zithapi.service';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {
  @HostBinding('class.c-app') cAppClass = true;

  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(
    private zithapi : ZithapiService,
    private http : HttpClient,
    // private cookieService: CookieService
  ) {
    this.zithapi.getUserRolesKC().subscribe({
      next: data => {
        var setData = new Set(Array.from(data));

      //  var roles = Array.from(data).join(' | ')
      this.navItems = this.navItems.filter(obj => {

         return obj.roles.some( o => Array.from(data).includes(o) )

       }  )

      },
      error:error => {

      }
    })

  }



  logout(){
    this.zithapi.logOutUser().subscribe({
      next:data =>{

        this.http.post("/logout",{}).subscribe(da => {

          sessionStorage.clear();

          localStorage.clear();

          // this.cookieService.deleteAll();

          window.location.reload()

        });
      },
      error:error => {

        this.http.post("/logout",{}).subscribe(da => {

          sessionStorage.clear();

          localStorage.clear();

          // this.cookieService.deleteAll();

          window.location.reload()

        });
      }
    })
  }
}
