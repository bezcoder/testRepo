import { INavData } from '@coreui/angular';

export interface MyINavData extends INavData {
  roles?: string[]
}

export const navItems: MyINavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard-icon-nav',
    roles : ['superuser','endadmin']
  },
  {
    name: 'Sales Analytics',
    url: '/analytics/sales',
    icon: 'salesanalytics-icon-nav',
    roles : ['superuser','endadmin']
  },
  {
    name: 'Customer Analytics',
    url: '/analytics/customer',
    icon: 'customeranalytics-icon-nav',
    roles : ['superuser','endadmin']
  },
  // {
  //   name: 'Analytics',
  //   url: '/analytics',
  //   icon: 'cil-speedometer',
  //   roles : ['superuser','endadmin'],
  //   children : [
  //     {
  //       name : 'Sales Analytics',
  //       url : '/analytics/sales',
  //       icon : 'cil-speedometer'
  //     },
  //     {
  //       name : 'Customer Analytics',
  //       url : '/analytics/customer',
  //       icon : 'cil-speedometer'
  //     }
  //   ]
  //   // badge: {
  //   //   variant: 'info',
  //   //   text: 'NEW'
  //   // }
  // },
  {
    name: 'Transactions',
    url: '/transactions',
    icon: 'transactions-icon-nav',
    roles : ['superuser','endadmin','enduser','store']
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Refunds',
    url: '/refunds',
    icon: 'refund-icon-nav',
    roles : ['superuser','endadmin','enduser','store']
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Settlements',
    url: '/settlements',
    icon: 'settlements-icon-nav',
    roles : ['superuser','endadmin']
    // badge: {,
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Feedback',
    url: '/feedback',
    icon: 'feedback-icon-nav',
    roles : ['superuser','endadmin']
    // badge: {,
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Merchants',
    url: '/zitharamerchants',
    icon: 'merchants-icon-nav',
    roles : ['superuser','endadmin']
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'QR Code',
    url: '/qrcode',
    icon: 'qrcode-icon-nav',
    roles : ['superuser','endadmin','enduser','store']
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  // {
  //   name: 'Notification',
  //   url: '/notification',
  //   icon: 'cil-speedometer',
  //   roles : ['superuser','endadmin','enduser','store']
  //   // badge: {
  //   //   variant: 'info',
  //   //   text: 'NEW'
  //   // }
  // },
  {
    name: 'Settings',
    url: '/settings',
    icon: 'settings-icon-nav',
    roles : ['superuser','endadmin']
  }
];
