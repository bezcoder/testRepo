import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TagModule } from 'primeng/tag';
import { SplitButtonModule } from 'primeng/splitbutton';
import { HttpClientModule } from '@angular/common/http';
import {SidebarModule} from 'primeng/sidebar';
import { MyClickOutsideDirective } from './my-click-outside.directive';
import {ListboxModule} from 'primeng/listbox';
// import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { IntiateRefundComponent } from './intiate-refund/intiate-refund.component';
import { CountdownModule } from 'ngx-countdown';
import { MySharedModule } from '../../shared/shared.module';
import {SelectButtonModule} from 'primeng/selectbutton';
import { NgxHowlerService } from 'ngx-howler'
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [TransactionsComponent,MyClickOutsideDirective, IntiateRefundComponent],
  providers : [NgxHowlerService,MessageService],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
    MySharedModule,
    InputNumberModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    InputSwitchModule,
    TagModule,
    SplitButtonModule,
    ProgressBarModule,
    HttpClientModule,
    SidebarModule,
    ListboxModule,
    CardModule,
    CountdownModule,
    SelectButtonModule,
    SkeletonModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class TransactionsModule { }
