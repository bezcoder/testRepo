import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
// import { KeycloakService } from 'keycloak-angular';

import { Observable } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        // private keycloakService: KeycloakService,
        //  private _cookieService: CookieService
          ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const authToken = this.keycloakService.getToken() || '';
        // console.log(authToken);


        // console.log('cookie--->',this._cookieService.getAll())
        // this._cookieService.get("SESSION")
        // header = request.headers
        // console.log(request.headers)
        if (!request.headers.keys().includes('Access-Control-Allow-Origin')){

            request = request.clone({
                setHeaders: {
                    'Access-Control-Allow-Origin':'*'
                }
            });
        }
        console.log('after---->',request.headers)

        return next.handle(request);
    }
}
