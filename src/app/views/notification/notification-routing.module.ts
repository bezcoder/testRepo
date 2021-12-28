import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationComponent } from './notification.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: NotificationComponent,
      data: {
        title: 'Notification',
        breadcrumb: ''
      }
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
