import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../../shared/services/role.service';
import { ZithapiService } from '../../../shared/services/zithapi.service';
import { MessageService, ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { validationMessages } from '../../../model/validation_messages.model';

type PasswordFields = 'password' ;
type PasswordsFormErrors = { [u in PasswordFields]: string };


export interface Product {
  id?:string;
  code?:string;
  name?:string;
  description?:string;
  price?:number;
  quantity?:number;
  inventoryStatus?:string;
  category?:string;
  image?:string;
  rating?:number;
}


@Component({
  selector: 'app-zicoins-config',
  templateUrl: './zicoins-config.component.html',
  styleUrls: ['./zicoins-config.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class ZicoinConfig implements OnInit {
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
  @Input() parentName: string;
  @Input() childName: string;
  productDialog: boolean;

    products: Product[];

    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    statuses: any[];

    // --------------------------------------------------------
  @Input() selectedSubMerchants: string;
  config: any;
  dataarr: { id: number; value: number; }[];
  showedit: any;

  constructor(private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private zithApiService: ZithapiService,
              private roleService:RoleService,
              private readonly elementRef: ElementRef,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig,
              private confirmationService: ConfirmationService) {
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required])
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    console.log(this.parentName,this.childName,this.selectedSubMerchants)
    if(this.parentName === undefined || this.parentName === null){
      this.parentName = this.route.snapshot.paramMap.get('parent');
    }

    if(this.childName === undefined || this.childName === null){
      this.childName = this.route.snapshot.paramMap.get('child');
    }

    if(this.selectedSubMerchants === undefined || this.selectedSubMerchants === null){
      this.selectedSubMerchants = this.route.snapshot.paramMap.get('merchantUserId');
    }



    this.getConfiguration()
  }




  cancel() {
    this.router.navigate(['/zitharamerchants/merchants']);
  }


  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
}

deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Fill Details and Send',
        header: 'Send Payment Link',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.products = this.products.filter(val => !this.selectedProducts.includes(val));
            this.selectedProducts = null;
            this.messageService.add({severity:'success', summary: 'Successfull', detail: 'Products Deleted', life: 3000});
        }
    });
}

editProduct(product: Product) {
    this.product = {...product};
    this.productDialog = true;
}

deleteProduct(product: Product) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + product.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.products = this.products.filter(val => val.id !== product.id);
            this.product = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        }
    });
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}

saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
        if (this.product.id) {
            this.products[this.findIndexById(this.product.id)] = this.product;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        }
        else {
            this.product.id = this.createId();
            this.product.image = 'product-placeholder.svg';
            this.products.push(this.product);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        this.products = [...this.products];
        this.productDialog = false;
        this.product = {};
    }
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

// --------------------------------------------------------------
getConfiguration(val?){
  // console.log(this.selectedSubMerchants)
  this.zithApiService.getSubMerchantConf(this.selectedSubMerchants)
  // tslint:disable-next-line: no-shadowed-variable
  .subscribe(data => {
    // this.config = data['greaterless']
    // console.log(this.config)
    this.unpackconfig(data['greaterless'])
    this.showSuccess('Configuration Receieved Succesfully');
  }, error => {

  });
}

showSuccess(message) {
  this.toastr.success(message);
}


 // method triggered when form is submitted
 submit(input) {
  // console.log(this.form.value);
  // const configData = this.form.value.configs;
  var data = {greaterless: {}};
  data.greaterless = input
  // const greaterless = {};
  // configData.forEach(element => {
  //   data.greaterless[element.startamount]  = element.percentage;
  // });

  console.log(data);
  console.log(this.selectedSubMerchants);
  this.zithApiService.changeSubMerchantConf(this.selectedSubMerchants, data)
  // tslint:disable-next-line: no-shadowed-variable
  .subscribe(data => {
    this.showSuccess('Configuration Added for '+ this.childName +' Succesfully');
    this.getConfiguration()

  }, error => {

  });
}

submitAll(input) {
  // console.log(this.form.value);
  // const configData = this.form.value.configs;
  var data = {greaterless: {}};
  data.greaterless = input
  // const greaterless = {};
  // configData.forEach(element => {
  //   data.greaterless[element.startamount]  = element.percentage;
  // });

  console.log(data);
  console.log(this.selectedSubMerchants);
  this.zithApiService.changeSubMerchantConfAll(this.selectedSubMerchants, data)
  // tslint:disable-next-line: no-shadowed-variable
  .subscribe(data => {
    this.showSuccess('Configuration Changed for Stores Succesfully');
    this.getConfiguration()

  }, error => {

  });
}


unpackconfig(data: Map<Number,Number>){

  this.dataarr = Object.keys(data).map( function(elem) {
    return {
      id : parseInt(elem),
      value : data[parseInt(elem)]*100
    }
  } )

  console.log('now', this.dataarr )

}


packconfig(){

  let result = {};
  this.dataarr.forEach( (elem) => {
    result[elem.id] = elem.value/100
  }
  )
  console.log('result',result)
  return result;


}



editConfig(elem){
  console.log(elem)
  this.showedit = elem
}

deleteConfig(elem){

  console.log(elem)
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      let item = this.dataarr.indexOf(elem)
      this.dataarr.splice(item,1)
      let data = this.packconfig()
      this.submit(data)
      this.messageService.add({severity:'success', summary: 'Successfull', detail: 'Configuration Deleted', life: 3000});
    }
});


}

confirmConfig(elem){
  this.showedit = undefined

  let data = this.packconfig()
  this.submit(data)


}

addConfig(){

  let min = this.dataarr[this.dataarr.length-1]['id']

  let elem = {
    id:min+1,
    value:0
  }

 this.dataarr.push(elem)

  this.editConfig(elem)
}

applytoAllStore(){
  this.confirmationService.confirm({
    message: 'Are you sure you want to apply this configuration to all other stores?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      let data = this.packconfig()
      this.submitAll(data)
    }
});
}


}
