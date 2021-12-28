import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantqrComponent } from './merchantqr.component';
import { MerchantqrRoutingModule } from './merchantqr-routing.module';
import { FormsModule } from '@angular/forms';
import { ZitharaPrintModule } from '../../shared/directives/zithara-print/zithara-print.module';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { MySharedModule } from '../../shared/shared.module';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [MerchantqrComponent],
  imports: [
    CommonModule,
    MerchantqrRoutingModule,
    FormsModule,
    ZitharaPrintModule,
    DropdownModule,
    SidebarModule,
    ListboxModule,
    ButtonModule,
    MySharedModule,
    SkeletonModule,
    CardModule
  ]
})
export class MerchantqrModule { }
