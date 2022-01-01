import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipsModule } from 'primeng/chips';
import { ContextMenuModule } from 'primeng/contextmenu';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { MySharedModule } from '../../shared/shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SettingsRoutingModule } from './settings-routing.module';
import { NotificationComponent } from './notification/notification.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';
import { ZicoinSettingsConfig } from './zicoins-config/zicoins-config.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogService } from 'primeng/dynamicdialog';
import { FeedbackConfigSettingsComponent } from './feedback-config/feedback-config.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PickListModule } from 'primeng/picklist';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MyClickOutsideDirective } from '../feedback/my-click-outside.directive';
import { NgxHowlerService } from 'ngx-howler';
import { ChipModule } from 'primeng/chip';



@NgModule({
  declarations: [
    SettingsComponent, NotificationComponent,ZicoinSettingsConfig,FeedbackConfigSettingsComponent
  ],
  providers : [MessageService,DialogService,ConfirmationService,NgxHowlerService],
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
    AutoCompleteModule,
    SkeletonModule,
    MultiSelectModule,
    HttpClientModule,
    SidebarModule,
    ListboxModule,
    MySharedModule,
    ReactiveFormsModule,
    CardModule,
    TableModule,
    ChipsModule,
    ChipModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
    InputTextModule,
    ProgressBarModule,
    FormsModule,
    ToastModule,
    InputSwitchModule,
    ButtonModule,
    TabMenuModule,
    ConfirmDialogModule,
    ToolbarModule,
    SelectButtonModule,
    PickListModule,
    RadioButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SettingsModule { }
