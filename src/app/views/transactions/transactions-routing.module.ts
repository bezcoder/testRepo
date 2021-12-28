import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntiateRefundComponent } from './intiate-refund/intiate-refund.component';
import { TransactionsComponent } from './transactions.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: TransactionsComponent,
      data: {
        title: 'Transactions',
        breadcrumb: ''
      }
    },
    {
      path: 'initiate-refund',
      component: IntiateRefundComponent,
      data: {
        title: 'Initiate Refund',
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
export class TransactionsRoutingModule { }
