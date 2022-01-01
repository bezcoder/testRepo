import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettlementsComponent } from './settlements.component';
import { SettlementsRoutingModule } from './settlements-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarModule } from 'primeng/sidebar';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { MySharedModule } from '../../shared/shared.module';
import { ToastModule } from '@coreui/angular';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [SettlementsComponent],
  imports: [
    CommonModule,
    SettlementsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MySharedModule,
    SidebarModule,
    ListboxModule,
    ToastModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule,
    DialogModule,
    CardModule,
    SkeletonModule

  ]
})
export class SettlementsModule { }
