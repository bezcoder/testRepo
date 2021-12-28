import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
// import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { cilMoon, cilSun, cilApplicationsSettings, cilX } from '@coreui/icons';
import { ZithapiService } from './shared/services/zithapi.service';


@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, public iconSet: IconSetService,

    private zithApiService : ZithapiService) {
    // iconSet singleton
    // iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };

    iconSet.icons = { cilMoon, cilSun, cilApplicationsSettings, cilX };
  }



  muteAudio:boolean = false

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });


  }


}
