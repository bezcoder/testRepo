import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAadharcard]'
})
export class AadharCardDirective {

  @HostListener('input', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    console.log('inside directive');
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, '');
    if (trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
    }

    const numbers = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }

    input.value = numbers.join(' ');

  }


}
