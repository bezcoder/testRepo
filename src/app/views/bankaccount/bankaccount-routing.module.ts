import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankaccountComponent } from './bankaccount.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: BankaccountComponent,
      data: {
        title: 'Bank Account',
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
export class BankaccountRoutingModule { }
