import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrCodeComponent } from './qr-code.component';
import { QrCodeRoutingModule } from './qr-code-routing.module';



@NgModule({
  declarations: [QrCodeComponent],
  imports: [
    CommonModule,
    QrCodeRoutingModule
  ]
})
export class QrCodeModule { }
