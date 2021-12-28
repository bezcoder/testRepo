import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZiprintService {
  public print(printEl: HTMLElement) {
    let printContainer: HTMLElement;
    printContainer  = document.querySelector('imgpr') || new HTMLElement

    console.log(printContainer);
    if (!printContainer) {
      printContainer = document.createElement('div');
      printContainer.id = 'print-container';
    }

    printContainer.innerHTML = '';

    // let elementCopy = printEl.cloneNode(true);
    // printContainer.appendChild(elementCopy);
    // document.body.appendChild(printContainer);

    window.print();
  }
}
