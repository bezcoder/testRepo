import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MerchantsComponent } from './merchants/merchants.component';
import { UploadDocComponent } from './upload-doc/upload-doc.component';
import { EditsubmerchantsComponent } from './editsubmerchants/editsubmerchants.component';
import { ZicoinConfig } from './zicoins-config/zicoins-config.component';
import { TerminalComponentComponent } from './editsubmerchants/terminal-component/terminal-component.component';
import { ChangemerchantuserpasswordComponent } from './merchants/changemerchantuserpassword/changemerchantuserpassword.component';
import { FeedbackConfigComponent } from './feedback-config/feedback-config.component';
const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'new-merchant',
      //   component: NewMerchantComponent,
      //   data: {
      //     title: 'New Merchant',
      //     breadcrumb: 'New Merchant'
      //   }
      // },
      {
        path: '',
        component: MerchantsComponent,
        data: {
          title: 'Merchants',
          breadcrumb: 'Zithara Merchant'
        }
      },
      {
        path: 'esubmerc/:parentMerchantId/:parentUserId',
        component: EditsubmerchantsComponent,
        data: {
          title: 'Edit Store',
          breadcrumb: 'Edit Store'
        }
      },
      {
        path: 'submercpass/:merchantUserId/:parent/:child',
        component: ChangemerchantuserpasswordComponent,
        data: {
          title: 'Change Password',
          breadcrumb: 'Change Password'
        }
      },
      {
        path: 'uploaddoc/:parentid',
        component: UploadDocComponent,
        data: {
          title: 'Upload Documents',
          breadcrumb: 'Upload Documents'
        }
      },
      {
        path: 'zicoinconfig/:merchantUserId/:parent/:child',
        component: ZicoinConfig,
        data: {
          title: 'Change Zicoins Configuration',
          breadcrumb: 'Change Zicoins Configuration'
        }
      },
      {
        path: 'addfeedback/:merchantUserId/:parent/:child',
        component: FeedbackConfigComponent,
        data: {
          title: 'Configure Feedback',
          breadcrumb: 'Configure Feedback'
        }
      },
      {
        path: 'terminals/:submerid',
        component: TerminalComponentComponent,
        data: {
          title: 'Terminals',
          breadcrumb: 'Manage Terminals'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule { }
