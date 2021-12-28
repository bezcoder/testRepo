import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inr'
})
export class InrPipe implements PipeTransform {

  transform(value: number): any  {
    if (! isNaN(value)) {
      var currencySymbol = '₹';
      // var result = value.toString().split('.');

      // var lastThree = result[0].substring(result[0].length - 3);
      // var otherNumbers = result[0].substring(0, result[0].length - 3);
      // if (otherNumbers != '')
      //     lastThree = ',' + lastThree;
      // var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

      // if (result.length > 1) {
      //     output += "." + result[1];
      // }

      var input:string = value.toString();
      var n1, n2;
      // value = value + '' || '';
      // works for integer and floating as well
      n1 = input.toString().split('.');
      n2 = n1[1] || null;
      n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
      input = n2 ? n1 + '.' + n2 : n1;
      // console.log("Input:",input)
      console.log("Output:",input)
      return currencySymbol + input;
    }
  }

}
