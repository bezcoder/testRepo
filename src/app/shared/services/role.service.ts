import { Injectable } from '@angular/core';
import { Role } from '../../model/roles';
import { User } from '../../model/user';

import { ZithapiService } from './zithapi.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private user: User = new User;
  private groupid : string = '';
  constructor(private apiservice: ZithapiService) {
  }
  // isAuthorized() {
  //   console.log(this.keycloakService.isLoggedIn);
  //     // return !!this.user;
  // }
 async hasRoleV2(rolearr:Role[]){

    var roles = localStorage.getItem("roles") || ''

    if(roles!==undefined && roles!==null){

      return rolearr.some(a => roles.includes(a) )

    } else {

      await this.apiservice.getUserRolesKC().toPromise().then((data:Array<String>) => {
        var items = data.join(",")
          localStorage.setItem("roles",items)
          return rolearr.some(a => items.includes(a) )

        },
        error => {

        })

    }
    return false

  }

  storeroles(){
    this.apiservice.getUserRolesKC().subscribe((data:Array<String>) => {

      var items = data.join(",")
      localStorage.setItem("roles",items)

    })
  }

  async hasRole(rolearr:Role[])  {
    var finalarr: boolean[]  = [];
    var userRoles :Array<String> = await this.apiservice.getUserRolesKC().toPromise();
      // return this.isAuthorized() && this.user.ole === role;
      if (userRoles && rolearr) {
        console.log('requested Roles', rolearr)
        console.log('got Roles', userRoles)
         rolearr.forEach(role => finalarr.push( userRoles.includes(role) ) )
         console.log('final array', finalarr.some(a => a))
         return finalarr.some(a => a)
      }
      return false
  }

  async getPrimeid(){
    var token = "";

      token = await this.apiservice.getGroupIdKC().toPromise();
      console.log("GOT GROUPID ID---->", token)

      return token

    }

    async getUserid(){

      var token = "";

      token = await this.apiservice.getUserIdKC().toPromise();
      console.log("GOT USER ID---->", token)

      return token

    }

    async getGroupName(){

      var token = "";

      token = await this.apiservice.getGroupNameKC().toPromise();
      // console.log("GOT USER ID---->", token)

      return token

    }


    async getFullName(){

      var token = "";

      token = await this.apiservice.getFullNameKC().toPromise();
      // console.log("GOT USER ID---->", token)

      return token

    }

    async logout(){

      var token = "";

      token = await this.apiservice.logOutUser().toPromise();
      // console.log("GOT USER ID---->", token)

      return token

    }

//   hasRole(rolearr:Role[]) : boolean {
//     var finalarr  = [];
//     var userRoles = this.keycloakService.getUserRoles();
//       // return this.isAuthorized() && this.user.ole === role;
//       if (this.keycloakService.isLoggedIn() && rolearr) {
//          rolearr.forEach(role => finalarr.push( userRoles.includes(role) ) )

//          return finalarr.some(a => a)
//       }

//       return false;
//   }

//   async getPayload(){

//    let token = await this.keycloakService.getToken().then(val => {
//      return jwt_decode(val) ;
//    } );


//     return token;
//   }

//  async getPrimeid(){

//     var token = (await this.getPayload())

//     return token['groups_ids'][0]

//   }

//   async getUserid(){

//     var token = (await this.getPayload())

//     return token['sub']

//   }

}
