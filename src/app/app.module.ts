import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TagModule } from 'primeng/tag';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { DefaultHeaderComponent } from './containers/default-layout/default-header/default-header.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent,
  DefaultHeaderComponent,
];

import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  BreadcrumbModule,
  CardModule,
  CalloutModule,
  ChartModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  LayoutModule,
  ListGroupModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  SwitchModule,
  TabsetModule,
  TogglerModule,
} from '@coreui/angular';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

// 3rd party
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Import routing module
import { AppRoutingModule, routes } from './app.routing';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MySharedModule } from './shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
    imports: [
        AlertModule,
        HttpClientModule,
        BadgeModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ButtonModule,
        BreadcrumbModule,
        CardModule,
        CalloutModule,
        ChartModule,
        CollapseModule,
        DropdownModule,
        GridModule,
        IconModule,
        IconSetModule.forRoot(),
        SharedModule,
        LayoutModule,
        ListGroupModule,
        ProgressModule,
        SidebarModule,
        SwitchModule,
        TabsetModule,
        TogglerModule,
        PerfectScrollbarModule,
        BsDropdownModule.forRoot(),
        FormModule,
        TagModule,
        MySharedModule,
        ToastrModule.forRoot(),
        NgxEchartsModule.forRoot({

          /**
           * This will import all modules from echarts.
           * If you only need custom modules,
           * please refer to [Custom Build] section.
           */
          echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
        }),
        RouterModule.forRoot(routes,{
          scrollPositionRestoration: 'top',
          anchorScrolling : 'enabled',
          relativeLinkResolution : 'legacy'

        })
    ],
  exports: [SharedModule],

  declarations: [
    AppComponent,
    ...APP_CONTAINERS
  ],
  providers: [
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy,
    // },
    AuthGuardService,
    IconSetService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
