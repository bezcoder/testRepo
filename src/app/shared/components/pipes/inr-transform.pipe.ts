import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inrlakh'
})
export class InrPipeLakh implements PipeTransform {

  transform(value: number): any  {
    if (! isNaN(value)) {
      if(value > 99999){
        value = value/100000
        var input = '₹'+ this.addcommas(value.toPrecision(2)) + 'L'
      } else {
        var input:string = '₹'+ this.addcommas(value.toString())
      }

      return  input;
    }
  }

  addcommas(input:string){
      var n1, n2;
      // value = value + '' || '';
      // works for integer and floating as well
      n1 = input.toString().split('.');
      n2 = n1[1] || null;
      n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
      input = n2 ? n1 + '.' + n2 : n1;
      return input
  }

}
