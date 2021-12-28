import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerAnalyticsComponent } from './customers/customer.analytics.component';
import { SalesAnalyticsComponent } from './sales/sales.analytics.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'customer',
      component: CustomerAnalyticsComponent,
      data: {
        title: 'Customer Analytics',
        breadcrumb: ''
      }
    },
    {
      path: 'sales',
      component: SalesAnalyticsComponent,
      data: {
        title: 'Sales Analytics',
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
export class AnalyticsRoutingModule { }
