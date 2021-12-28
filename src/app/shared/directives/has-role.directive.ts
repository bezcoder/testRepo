import { Directive, OnInit, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { Role } from '../../model/roles';
import { RoleService } from '../services/role.service';

import { ZithapiService } from '../services/zithapi.service';
// import { KeycloakService } from 'keycloak-angular';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective {
  userRoles: Role[] = [];

  @Input()
  set hasRole(roles: Role[]) {
      if (!roles || !roles.length) {
          throw new Error('Roles value is empty or missed');
      }
      this.userRoles = roles;
  }

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private roleService: RoleService,
              private apiservice: ZithapiService
              // private keycloakService: KeycloakService
              ) { }
  ngOnInit() {


          var rolearr:Role[] = this.userRoles

          var roles:string = localStorage.getItem("roles") || ''

          if(roles!==undefined && roles!==null){


            this.apiservice.getUserRolesKC().toPromise().then((data:Array<String>) => {
              var items = data.join(",")
                localStorage.setItem("roles",items)
                // return true
                 if(rolearr.some(a => items.includes(a) )){
                  this.viewContainer.createEmbeddedView(this.templateRef);
                 } else {
                  this.viewContainer.clear();
                 }

              },
              error => {

              })

            if(roles !== null){
              return rolearr.some(a => roles.includes(a) )
            } else {
              return false
            }


          } else {

             this.apiservice.getUserRolesKC().toPromise().then((data:Array<String>) => {
              var items = data.join(",")
                localStorage.setItem("roles",items)
                // return true
                 if(rolearr.some(a => items.includes(a) )){
                  this.viewContainer.createEmbeddedView(this.templateRef);
                  return true
                 } else {
                  this.viewContainer.clear();
                  return false
                 }

              },
              error => {
                return false
              })
      return false
          }


  }

}
