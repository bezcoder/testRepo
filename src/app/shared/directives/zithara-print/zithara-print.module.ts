import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZitharaPrintDirective } from './zithara-print.directive';

@NgModule({
  declarations: [ZitharaPrintDirective],
  imports: [
    CommonModule
  ],
  exports: [ZitharaPrintDirective]
})
export class ZitharaPrintModule { }
