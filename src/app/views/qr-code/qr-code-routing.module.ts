import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QrCodeComponent } from './qr-code.component';

const routes: Routes = [
  {
    path: '',
    component: QrCodeComponent,
    data: {
      title: 'QR Code',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrCodeRoutingModule {}
