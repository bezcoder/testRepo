import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ZiloaderService {
  public isZiLoading = new BehaviorSubject(false);
  changeIsLoadin(value: boolean): any {
    this.isZiLoading.next(value);
  }
}
