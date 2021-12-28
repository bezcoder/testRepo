import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule, CarouselModule, GridModule, ProgressModule, SharedModule, SubheaderComponent, WidgetModule } from '@coreui/angular';
import { ChartsModule } from 'ng2-charts';
import { MySharedModule } from '../../shared/shared.module';
import { SkeletonModule } from 'primeng/skeleton';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { SalesAnalyticsComponent } from './sales/sales.analytics.component';
import { CustomerAnalyticsComponent } from './customers/customer.analytics.component';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [
    SalesAnalyticsComponent,
    CustomerAnalyticsComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    CardModule,
    GridModule,
    // NgbModule,
    // ChartistModule,
    ChartsModule,
    AnalyticsRoutingModule,
    // NgxChartsModule,
    // NgxDatatableModule,
    NgxEchartsModule,
    DropdownModule,
		ButtonModule,
		ToastModule,
    MultiSelectModule,
    MySharedModule,
    SkeletonModule,
    ProgressModule,
  ButtonModule,
  DropdownModule,
  SharedModule,
  WidgetModule,
  CalendarModule,
  SliderModule,
  ProgressSpinnerModule
  ],
  providers: [CurrencyPipe]
})
export class AnalyticsModule { }
