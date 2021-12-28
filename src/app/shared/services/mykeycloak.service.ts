import { Injectable } from '@angular/core';
import { User } from '../../model/user';


@Injectable({
  providedIn: 'root'
})
export class MyKeycloakService {
  private user: User = new User;
  // constructor(private keycloakService: KeycloakService) {
  }

// getTokenDecoded(token:string){

//    let token_decoded = jwt_decode(token);
//    console.log(token_decoded)
//   return token_decoded
// }

// getGroupname(){

//   this.keycloakService.getToken()
//   .then( res => {
//     // console.log('token---->', res)
//    var decoded_token =  this.getTokenDecoded(res)
//   //  console.log('TOKEN-------------->',decoded_token)
//    let name =  decoded_token['groupname']
//   //  console.log('group name-------------->',name[0].replace("/",""))
//    if (name.length === 0) {
//      return "Zithara"
//    }

//    return name[0].replace("/","")

//   }

//   )

// }



