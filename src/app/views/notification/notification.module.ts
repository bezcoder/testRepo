import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { NotificationRoutingModule } from './notification-routing.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MySharedModule } from '../../shared/shared.module';
import { ListboxModule } from 'primeng/listbox';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ProgressBarModule } from 'primeng/progressbar';
import {ChipsModule} from 'primeng/chips';
import {ToastModule} from 'primeng/toast';
import {InputSwitchModule} from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    NotificationComponent
  ],
  providers : [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    NotificationRoutingModule,
    AutoCompleteModule,
    SkeletonModule,
    DropdownModule,
    MultiSelectModule,
    HttpClientModule,
    SidebarModule,
    ListboxModule,
    MySharedModule,
    ReactiveFormsModule,
    CardModule,
    TableModule,
    ChipsModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
    InputTextModule,
    ProgressBarModule,
    FormsModule,
    ToastModule,
    InputSwitchModule,
    ButtonModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NotificationModule { }
