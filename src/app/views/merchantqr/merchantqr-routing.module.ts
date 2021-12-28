import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MerchantqrComponent } from './merchantqr.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MerchantqrComponent,
        data: {
          title: 'QR',
          breadcrumb: ''
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantqrRoutingModule { }
