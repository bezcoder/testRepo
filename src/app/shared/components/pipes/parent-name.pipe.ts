import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'cleanparentname'})
export class ParentNamePipe implements PipeTransform {
  transform(text: String): String {
    
    return text.replace(/@#&[0-9]+/,"") ;
  }
}