import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankaccountRoutingModule } from './bankaccount-routing.module';
import { BankaccountComponent } from './bankaccount.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '@coreui/angular';
import { RoleService } from '../../services/role.service';

@NgModule({
  declarations: [
    BankaccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BankaccountRoutingModule,
    SharedModule,
    DropdownModule,
    ButtonModule
  ],
  providers:[RoleService]
})
export class BankaccountModule { }
