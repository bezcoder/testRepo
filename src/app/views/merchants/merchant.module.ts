import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MerchantsComponent } from './merchants/merchants.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CdkStepperModule } from '@angular/cdk/stepper';

import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import { PrimMerchantService } from '../../shared/services/get-prim-merchantservice';
import {InputSwitchModule} from 'primeng/inputswitch';
import { TagModule } from 'primeng/tag';
import {SplitButtonModule} from 'primeng/splitbutton';
import { EditsubmerchantsComponent } from './editsubmerchants/editsubmerchants.component';
import {PasswordModule} from 'primeng/password';
import { ZicoinConfig } from './zicoins-config/zicoins-config.component';
import { InputNumberModule } from 'primeng/inputnumber';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
import {InputMaskModule} from 'primeng/inputmask';
import {DynamicDialogModule, DialogService} from 'primeng/dynamicdialog';
import { SidebarModule } from 'primeng/sidebar';
import { ListboxModule } from 'primeng/listbox';
import { UploadDocComponent } from './upload-doc/upload-doc.component';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';
import { ParentNamePipe } from '../../shared/components/pipes/parent-name.pipe';
import { AadharCardDirective } from '../../shared/directives/aadharcard.directive';
import { TerminalComponentComponent } from './editsubmerchants/terminal-component/terminal-component.component';
import { MySharedModule } from '../../shared/shared.module';
import { ChangemerchantuserpasswordComponent } from './merchants/changemerchantuserpassword/changemerchantuserpassword.component';
import { FeedbackConfigComponent } from './feedback-config/feedback-config.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import {PickListModule} from 'primeng/picklist';
import { ChipModule } from 'primeng/chip';
import {RadioButtonModule} from 'primeng/radiobutton';

@NgModule({
  declarations: [ MerchantsComponent,ZicoinConfig,ParentNamePipe,
                 AadharCardDirective, TerminalComponentComponent, EditsubmerchantsComponent,
                 UploadDocComponent, ChangemerchantuserpasswordComponent,FeedbackConfigComponent ],

  imports: [
    CommonModule,
    MerchantRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MySharedModule,
    CdkStepperModule,
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
    ProgressBarModule,
    InputSwitchModule,
    TagModule,
    SplitButtonModule,
    PasswordModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    ToolbarModule,
    RatingModule,
    FileUploadModule,
    InputMaskModule,
    DynamicDialogModule,
    SidebarModule,
    ListboxModule,
    MessagesModule,
    CardModule,
    SelectButtonModule,
    PickListModule,
    ChipModule

  ],

  providers: [PrimMerchantService,MessageService,DialogService,ConfirmationService]
})
export class MerchantModule { }
