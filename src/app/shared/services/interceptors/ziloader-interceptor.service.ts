import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ZiloaderService } from '../ziloader.service';

@Injectable({
  providedIn: 'root'
})
export class ZiloaderInterceptor implements HttpInterceptor{
  private requests: HttpRequest<any>[] = [];
  urlsToNotUse: Array<string>;
  constructor(private loaderService: ZiloaderService) {
    this.urlsToNotUse = [
      '/productdetail/.+'
    ];
   }

  removeRequest(req: HttpRequest<any>): any {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    console.log('removing request',i, this.requests.length);
    this.loaderService.isZiLoading.next(this.requests.length > 0);
    // this.loaderService.changeIsLoadin(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.requests.push(req);

    console.log('No of requests--->' + this.requests.length);
    this.loaderService.isZiLoading.next(true);
    // this.loaderService.changeIsLoadin(true);
    // tslint:disable-next-line: deprecation
    return Observable.create( (observer:any) => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => {
            // console.log('error' + JSON.stringify(err));
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
