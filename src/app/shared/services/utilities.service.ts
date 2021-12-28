import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  isNumberKey(evt:any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else {
      return true;
    }
  }

  checkMobileNumberLength(evt:any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(evt.charCode);
    if (!pattern.test(inputChar)) {
      return evt.preventDefault();
    }
  }

  isEmptyObject(obj: {}) {
    return (obj && (Object.keys(obj).length === 0));
  }

  searchInArrayOfObject(key:any, dataArray:any) {
    for (var i = 0; i < dataArray.length; i++) {
      if (dataArray[i].id === key) {
          return dataArray[i];
      }
    }
  }

}
