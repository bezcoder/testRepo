import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { TranslateModule } from '@ngx-translate/core';
// import { DragulaModule } from 'ng2-dragula';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';
import 'mousetrap';


// Directives
import { CdkStepperModule } from '@angular/cdk/stepper';
import { HasRoleDirective } from './directives/has-role.directive';
import { RoleService } from './services/role.service';
import { InrPipe } from './components/pipes/inr.pipe';
import {AvatarModule} from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InrPipeLakh } from './components/pipes/inr-transform.pipe';
import { NotificationServiceComponent } from './notification-service/notification-service.component';

@NgModule({
  declarations: [
    HasRoleDirective,
    InrPipe,
    InrPipeLakh,
    NotificationServiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // TranslateModule,
    // DragulaModule.forRoot(),
    // NgbModule,
    CdkStepperModule,
    AvatarModule,
    ButtonModule

  ],
  exports: [
    HasRoleDirective,
    // TranslateModule,
    InrPipe,
    InrPipeLakh
  ],
  providers: [
    // NavService,
    RoleService,
    // MyKeycloakService
  ]
})
export class MySharedModule { }

