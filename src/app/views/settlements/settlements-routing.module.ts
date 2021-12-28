import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettlementsComponent } from './settlements.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: SettlementsComponent,
      data: {
        title: 'Settlements',
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
export class SettlementsRoutingModule { }
