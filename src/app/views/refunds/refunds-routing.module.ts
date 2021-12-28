import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefundsComponent } from './refunds.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: RefundsComponent,
      data: {
        title: 'Refunds',
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
export class RefundsRoutingModule { }
