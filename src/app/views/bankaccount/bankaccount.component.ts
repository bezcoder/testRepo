import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../model/roles';
import { validationMessages } from '../../model/validation_messages.model';
import { RoleService } from '../../services/role.service';
import {UtilitiesService} from '../../shared/services/utilities.service';
import { ZithapiService } from '../../shared/services/zithapi.service';
type BankAccountFields =  'beneficiaryAccountNumber' | 'beneficiaryIfscCode' |
                          'beneficiaryName' | 'beneficiaryMobile' |
                          'beneficiaryEmail' | 'vpa';

type BankAccountFieldFormErrors = { [u in BankAccountFields]: string };

@Component({
  selector: 'app-bankaccount',
  templateUrl: './bankaccount.component.html',
  styleUrls: ['./bankaccount.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BankaccountComponent implements OnInit {
  public addBankAccount: FormGroup;
  public validationMessages = validationMessages;
  public sidebaron: any;
  public bankAccountFormErrors: BankAccountFieldFormErrors = {
    beneficiaryAccountNumber: '',
    beneficiaryIfscCode: '',
    beneficiaryName: '',
    beneficiaryMobile: '',
    beneficiaryEmail: '',
    vpa: ''
  };
  public errorMessage: any;
  public parentMerchantID: any;
  public accountData: any;
  public parentMerchantsData: any;
  public selectedParentMerc: any;
  public showBankAccountForm = false;
  public bankAccountLoaded: Promise<boolean>;
  public Role = Role;

  mode: any;
  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private zithApiService: ZithapiService,
              private readonly elementRef: ElementRef,
              private roleService:RoleService,
              public utilities: UtilitiesService) {
    this.addBankAccount = new FormGroup({
      beneficiaryName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-z0-9 ]*$/),
        Validators.minLength(3),
        Validators.maxLength(50)]),
      beneficiaryAccountNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{9,18}$/),
        Validators.minLength(9),
        Validators.maxLength(18)]),
      beneficiaryIfscCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{4}0[A-Z0-9]{6}$/)]),
      beneficiaryMobile: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/)]),
      beneficiaryEmail: new FormControl('', [
        Validators.required,
        Validators.email]),
      vpa: new FormControl('',
      // [
        // Validators.required,
        // Validators.pattern(/^[\w.-_]+@\w+$/)]
        ),
    });
  }

  ngOnInit(): void {

    this.initMerchant()

  }

  initMerchant(){
    this.zithApiService.getUserRolesKC().subscribe((data:Array<String>) => {
      if(data.includes(Role.SuperUser)){

        this.getParentMerchants();

      } else if(data.includes(Role.Admin)){

        this.roleService.getPrimeid().then(val => this.getBankAccountForMerc(val.toString())  )

      }}, error => {

    });
   }

  getParentMerchants(): void {
    this.zithApiService.getPrimaryMerchants()
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.parentMerchantsData = data.body.data;
      this.selectedParentMerc = this.parentMerchantsData[0].id;
      this.getBankAccountForMerc(this.parentMerchantsData[0].id);
      console.log(this.parentMerchantsData);
    }, error => {

    });
  }

  getBankAccountForMerc(merchantId): void {
    this.accountData = {};
    this.bankAccountLoaded = Promise.resolve(false);
    // console.log(merchantId);
    this.zithApiService.getBankAccount(merchantId)
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.accountData = data.bankinfo;
      this.bankAccountLoaded = Promise.resolve(true);
      // console.log(data);
    }, error => {
    });
  }

  showAddEditBankAccountForm(mode, data): void {
    this.mode = mode;
    if(mode === 'add') {
      this.showBankAccountForm = true;
    } else if(mode === 'edit') {
      this.showBankAccountForm = true;
      this.addBankAccount.patchValue(data);
      console.log(this.addBankAccount);
      console.log(data);

    }
  }

  showSuccess(message) {
    this.toastr.success(message);
  }

  addBankAccountMerchant(addbankaccountdata): void {
    console.log(addbankaccountdata);
    addbankaccountdata.parentmerchantId = this.selectedParentMerc;
    console.log(this.selectedParentMerc);
    this.zithApiService.createBankAccount(addbankaccountdata).subscribe({
      next : res => {
        this.showBankAccountForm = false;
        this.getBankAccountForMerc(this.selectedParentMerc);
        this.showSuccess('Bank Account Created Successfully');
      },
      error: error => {

        console.log(error);
      }
    });
  }

  resetAndCancel(): void {
    this.showBankAccountForm = false;
  }

}
