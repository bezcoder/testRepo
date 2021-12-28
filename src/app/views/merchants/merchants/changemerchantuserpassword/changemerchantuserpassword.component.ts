import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../../../model/roles';
import { validationMessages } from '../../../../model/validation_messages.model';
import { RoleService } from '../../../../services/role.service';
import { ZithapiService } from '../../../../shared/services/zithapi.service';

type PasswordFields = 'password' ;
type PasswordsFormErrors = { [u in PasswordFields]: string };

@Component({
  selector: 'app-changemerchantuserpassword',
  templateUrl: './changemerchantuserpassword.component.html',
  styleUrls: ['./changemerchantuserpassword.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangemerchantuserpasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public validationMessages = validationMessages;
  public sidebaron: any;
  changePasswordDetails = {
    id: '',
    password: ''
  };
  public formErrors: PasswordsFormErrors = {
    password: '',
  };

  public errorMessage: any;
  parentName: string;
  childName: string;

  constructor(private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private zithApiService: ZithapiService,
              private roleService:RoleService,
              private readonly elementRef: ElementRef) {
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required])
    });
  }

  ngOnInit(): void {
    this.parentName = this.route.snapshot.paramMap.get('parent');
    this.childName = this.route.snapshot.paramMap.get('child');
    console.log(this.parentName,this.childName)

    if (!(this.roleService.hasRoleV2([Role.SuperUser,Role.Admin]))){
      this.router.navigate(['/']);
      }
  }

  resetFields() {
    this.changePasswordForm = this.fb.group({
      password: new FormControl('')
    });
  }
  showSuccess(message) {
    this.toastr.success(message);
  }

  submit(value) {
    console.log(value);
    const changePasswordData = value;
    const merchantUserID = this.route.snapshot.paramMap.get('merchantUserId');
    this.changePasswordDetails.id = merchantUserID;
    this.changePasswordDetails.password = value.password;
    console.log(this.changePasswordDetails);
    this.zithApiService.changeMerchantPassword(this.changePasswordDetails).subscribe({
      next : res => {
        this.resetFields();
        this.showSuccess('Password Changed Successfully');
      },
      error: error => {
        console.log(error);
      }
    });
  }

  cancel() {
    this.router.navigate(['/zitharamerchants/merchants']);
  }

}
