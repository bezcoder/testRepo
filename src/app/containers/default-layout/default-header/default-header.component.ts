import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { ZithapiService } from '../../../shared/services/zithapi.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  fullname: string;
  groupname: string;
  showname: boolean = false;
  showgroupname: boolean =false;
  smallscreen: boolean = false;
  showrole: string;
  constructor(private classToggler: ClassToggleService,
    private zithapi : ZithapiService,
    private breakpointObserver: BreakpointObserver,
    ) {
    super();

    this.zithapi.getFullNameKC().toPromise().then(data => {
      this.fullname = data
      console.log("FULNAME",this.fullname)
      this.showname = true
    })

    this.zithapi.getGroupNameKC().toPromise().then(data => {
      this.groupname = data
      console.log("GROUPNAME", this.groupname)
      this.showgroupname = true
    })

    this.breakpointObserver.observe([
      '(max-width: 960px)'
        ]).subscribe(result => {
          if (result.matches) {
            this.smallscreen = true
          } else {
            // if necessary:
            this.smallscreen = false
          }
        });

        this.zithapi.getUserRolesKC().subscribe({
          next:data =>{
            if(Array.from(data).includes('superuser')){
              this.showrole = 'Superuser'
            } else if(Array.from(data).includes('endadmin')){
              this.showrole = 'Admin'
            }   else if(Array.from(data).includes('store')){
              this.showrole = 'Store'
            }
            else if(Array.from(data).includes('enduser')){
              this.showrole = 'Terminal'
            }

          },
          error:error =>{

          }
        })
  }

  ngOnInit(): void {}

  // toggleTheme() {
  //   this.classToggler.toggle('.c-app', 'c-dark-theme');
  // }



  textreducer(label:string){
    label = label.split(" ")[0]
    if(label.length > 10){
      label = label.substr(0,10) + '...'
      return label
    } else {
      return label
    }
  }

}
