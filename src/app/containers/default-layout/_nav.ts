import { INavData } from '@coreui/angular';

export interface MyINavData extends INavData {
  roles?: string[]
}

export const navItems: MyINavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'cil-speedometer',
    roles : ['superuser','endadmin']
  },
  {
    name: 'Sales Analytics',
    url: '/analytics/sales',
    icon: 'cil-speedometer',
    roles : ['superuser','endadmin']
  },
  {
    name: 'Customer Analytics',
    url: '/analytics/customer',
    icon: 'cil-speedometer',
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
    icon: 'cil-speedometer',
    roles : ['superuser','endadmin','enduser','store']
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Refunds',
    url: '/refunds',
    icon: 'cil-speedometer',
    roles : ['superuser','endadmin','enduser','store']
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Settlements',
    url: '/settlements',
    icon: 'cil-speedometer',
    roles : ['superuser','endadmin']
    // badge: {,
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Feedback',
    url: '/feedback',
    icon: 'cil-speedometer',
    roles : ['superuser','endadmin']
    // badge: {,
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Merchants',
    url: '/zitharamerchants',
    icon: 'cil-speedometer',
    roles : ['superuser','endadmin']
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'QR Code',
    url: '/qrcode',
    icon: 'cil-speedometer',
    roles : ['superuser','endadmin','enduser','store']
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Notification',
    url: '/notification',
    icon: 'cil-speedometer',
    roles : ['superuser','endadmin','enduser','store']
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Settings',
    url: '/settings',
    icon: 'cil-speedometer',
    roles : ['superuser','endadmin']
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  }
];
