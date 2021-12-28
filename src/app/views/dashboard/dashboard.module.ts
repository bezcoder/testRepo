import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule, CarouselModule, GridModule, ProgressModule, SharedModule, SubheaderComponent, WidgetModule } from '@coreui/angular';
import { ChartsModule } from 'ng2-charts';
import { MySharedModule } from '../../shared/shared.module';
import { SkeletonModule } from 'primeng/skeleton';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    CardModule,
    GridModule,
    AutoCompleteModule,
    // NgbModule,
    // ChartistModule,
    ChartsModule,
    DashboardRoutingModule,
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
  WidgetModule
  ],
  providers: [CurrencyPipe]
})
export class DashboardModule { }
