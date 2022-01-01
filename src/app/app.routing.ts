import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from './services/auth/auth-guard.service';

// Import Containers
import { DefaultLayoutComponent } from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'qrcode',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/merchantqr/merchantqr.module').then(m => m.MerchantqrModule)
      },
      {
        path: 'zitharamerchants',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/merchants/merchant.module').then(m => m.MerchantModule)
      },
      {
        path: 'settlements',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/settlements/settlements.module').then(m => m.SettlementsModule)
      },
      {
        path: 'refunds',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/refunds/refunds.module').then(m => m.RefundsModule)
      },
      {
        path: 'transactions',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/transactions/transactions.module').then(m => m.TransactionsModule)
      },
      {
        path: 'analytics',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/analytics/analytics.module').then(m => m.AnalyticsModule)
      },
      {
        path: 'feedback',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/feedback/feedback.module').then(m => m.FeedbackModule)
      },
      {
        path: 'settings',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/settings/settings.module').then(m => m.SettingsModule)
      }
    ]
  },


];

@NgModule({
//   imports: [
//     RouterModule.forRoot(routes, {
//       useHash : true,
//     scrollPositionRestoration: 'top',
//     // anchorScrolling: 'enabled',
//     // relativeLinkResolution: 'legacy'
// }),
//   ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
