import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Role } from '../../../model/roles';
import { RoleService } from '../../../services/role.service';
import { ZithapiService } from '../../../shared/services/zithapi.service';

export interface notifyConfig{
  submerchantid : string;

  terminalid? : string;

  phones: Array<String> ;

  emails: Array<String>;

  type : string;

  active : boolean;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {


  @Input() public selectedSubMerchants: any;
  @Input() public selectedMerchants: any;
  @Input() public selectedTerminals: any;

  public Role = Role;
  settlementConfig : notifyConfig = {
    submerchantid: '',
    phones: [],
    emails: [],
    type: '',
    active : false
  }
  transactionConfig : notifyConfig = {
    submerchantid: '',
    phones: [],
    emails: [],
    type: '',
    active : false
  }
  typeOptions: { id: string; name: string; }[];

  constructor(
    private toastr: MessageService,
    private zithApiService: ZithapiService,
    private roleService: RoleService,
    // private primengConfig: PrimeNGConfig,
    private router : Router
  ) {

    this.typeOptions = [
      {
        id:'trans',
        name: 'Transactions'
      },
      {
        id:'settle',
        name: 'Settlements'
      },
    ]

   }



  ngOnInit(): void {
    // this.primengConfig.ripple = true
    this.getTransactions(undefined);
  }




  showSuccess(message) {
    // this.toastr.success(message);
    this.toastr.add({key: 'myKey1', severity:'success', summary: 'Success', detail: message});
  }

  showError(message) {
    // this.toastr.error(message);
    this.toastr.add({key: 'myKey1', severity:'error', summary: 'Error', detail: message});
  }


  getTransactions(event:any){

    this.zithApiService.getNotificationsConfig(this.selectedSubMerchants.id).subscribe({
      next:data => {

      if(data !== 'Configuration Not Found'){
        Array.from(data).forEach( (o: notifyConfig) => {
          if(o['type'] === 'trans'){
            this.transactionConfig = o
          } else if(o['type'] === 'settle'){
            this.settlementConfig = o
          }
        })
        this.showSuccess("Configuration loaded!!")
      } else {
        this.settlementConfig  = {
          submerchantid: '',
          phones: [],
          emails: [],
          type: '',
          active : false
        }
        this.transactionConfig = {
          submerchantid: '',
          phones: [],
          emails: [],
          type: '',
          active : false
        }
      }



      },
      error:error => {

      }
    })
  }

  cleanPhoneNumberList(conf:string){
    if(conf === 'trans'){

    var phone = this.transactionConfig.phones
    const regex = /[1-9]+/g;
    phone.forEach(o => {
      console.log((o.length === 10) || (!!o.match(regex)) || (o.match(regex)[0].length===10))
    })


    phone = phone.filter( o => {
      if((o.length === 10) && (!!o.match(regex)) && (o.match(regex)[0].length===10)){
        return true
      } else {
        return false
      }
    })


    this.transactionConfig.phones = phone

    } else if( conf === "settle"){

     var phone = this.settlementConfig.phones
    const regex = /[1-9]+/g;
    phone.forEach(o => {
      console.log((o.length === 10) || (!!o.match(regex)) || (o.match(regex)[0].length===10))
    })


    phone = phone.filter( o => {
      if((o.length === 10) && (!!o.match(regex)) && (o.match(regex)[0].length===10)){
        return true
      } else {
        return false
      }
    })


    this.settlementConfig.phones = phone

    }


  }

  cleanEmailList(conf:string){

    if(conf ==='trans'){

      var email = this.transactionConfig.emails
      const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g;


      email = email.filter( o => {
        if(!!o.match(regex)){
          return true
        } else {
          return false
        }
      })

      this.transactionConfig.emails = email

    } else if (conf ==='settle'){

      var email = this.settlementConfig.emails
      const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g;


      email = email.filter( o => {
        if(!!o.match(regex)){
          return true
        } else {
          return false
        }
      })

      this.settlementConfig.emails = email

    }



  }


  activateConfig(str:string,event:Event){
    if(str ==='trans'){
      this.transactionConfig.active = event['checked']

    } else if(str ==='settle'){
      this.settlementConfig.active = event['checked']
    }

  }

  saveConfig(conf:string){

    if(conf === 'trans'){
      this.transactionConfig.submerchantid = this.selectedSubMerchants.id
      this.transactionConfig.type = 'trans'
      this.transactionConfig.terminalid = this.selectedTerminals.id
      this.zithApiService.addModifyNotifications(this.transactionConfig).subscribe({
        next:data => {
            this.showSuccess(data)
        },
        error:error => {

        }
      })
    } else if(conf === 'settle'){

      this.settlementConfig.submerchantid = this.selectedSubMerchants.id
      this.settlementConfig.type = 'settle'
      this.settlementConfig.terminalid = this.selectedTerminals.id
      this.zithApiService.addModifyNotifications(this.settlementConfig).subscribe({
        next:data => {
            this.showSuccess(data)
        },
        error:error => {

        }
      })
    }



  }

  // assignConfig(submerchantid:string,type:string,terminalid?:string){
  //   this.typeOptions.forEach( o => {

  //     if (type === 'trans'){
  //       var config:notifyConfig = {
  //         submerchantid: submerchantid,
  //         phones: [],
  //         emails: [],
  //         type: type
  //       }
  //       this.transactionConfig =
  //     } else if(type === 'settle') {
  //       var config:notifyConfig = {
  //         submerchantid: submerchantid,
  //         terminalid : terminalid,
  //         phones: [],
  //         emails: [],
  //         type: type
  //       }
  //     }


  //   })
  // }

}
