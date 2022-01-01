import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
  path: '',
  children: [
    {
      path: '',
      component: SettingsComponent,
      data: {
        title: 'Settings',
        breadcrumb: 'Settings'
      }
    },
    {
      path: 'notification',
      component: NotificationComponent,
      data: {
        title: 'Settings',
        breadcrumb: 'Notification'
      }
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
