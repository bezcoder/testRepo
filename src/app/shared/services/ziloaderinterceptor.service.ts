import { Injectable, Injector } from '@angular/core';
import {  HttpEvent,
          HttpInterceptor,
          HttpHandler,
          HttpRequest,
          HttpResponse,
          HttpErrorResponse
        } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ZiloaderService } from './ziloader.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZiloaderInterceptorService implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];

  constructor(private ziloaderService: ZiloaderService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    console.log('removing request',i, this.requests.length);
    this.ziloaderService.isZiLoading.next(this.requests.length > 0);

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.ziloaderService.isZiLoading.next(true);
    return Observable.create((observer: { next: (arg0: HttpResponse<any>) => void; error: (arg0: any) => void; complete: () => void; }) => {
      const subscription = next.handle(req)
        .subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        err => { this.removeRequest(req); observer.error(err); },
        () => { this.removeRequest(req); observer.complete(); });
      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
