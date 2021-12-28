import { Component, HostListener, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Role } from '../../../model/roles';
import { UpdatePrimMerchant } from '../../../model/update-prim-merchant';
import { UpdateSubMerchant } from '../../../model/update-sub-merchant';
import { UpdateUserInfo } from '../../../model/user-info';
import { RoleService } from '../../../services/role.service';
import { ZithapiService } from '../../../shared/services/zithapi.service';

@Component({
  selector: 'app-editsubmerchants',
  templateUrl: './editsubmerchants.component.html',
  styleUrls: ['./editsubmerchants.component.scss']
})
export class EditsubmerchantsComponent implements OnInit {
  actionitemsMethodSubM: (prim: any) => { label: string; icon: string; command: (event: any) => void; }[];
  loading: boolean;
  submerchantdata
  submdatasource
  parentMerchantId: string;
  collectionSize: any;
  public Role = Role;
  @ViewChildren('drdwnsubm') drdwnsubm: QueryList<ElementRef>
  priMerchantName: string;
  currentPage: number;
  currentSize: number;
  superuser: boolean;
  displayPosition: boolean;
  position: string;
  paymentlinkform = {}
  paymentlinkmerchantid: any;
  phonepayment
  amountpaymentlink = '0'
  smallscreen: boolean;
  dialogwidth: string;
  validators: any;
  parentUserId: string;
  lastLazyLoadEvent: LazyLoadEvent;
  searchterm = null
  page = 1;
  pageSize = 5;
  options: { name: string; icon: string; method: string; }[];
  visibleSidebar4 = false;
  sidebarprim: any;
  sidebarheader: string;
  merchantData: any;

  constructor(
    private roleService:RoleService,
    private router:Router,
    private zithApiService: ZithapiService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private breakpointObserver: BreakpointObserver,
    private toastr: ToastrService,
    public dialogService: DialogService,
    ) {

   }

  ngOnInit(): void {
    if (!(this.roleService.hasRoleV2([Role.SuperUser,Role.Admin]))){
      this.router.navigate(['/']);
      }

      if (!(this.roleService.hasRoleV2([Role.SuperUser]))){
        this.superuser = false
        } else {
          this.superuser = true
        }



      this.parentMerchantId = this.route.snapshot.paramMap.get('parentMerchantId');
      this.parentUserId = this.route.snapshot.paramMap.get('parentUserId');

      this.getZitharaUsersByPrim();

      this.options = [
        // {
        //   name:'Change Password',
        //   icon:'pi pi-lock',
        //   method : 'chg_psswd'
        // },
        // {
        //   name:'Configure Zicoins',
        //   icon:'pi pi-cog',
        //   method : 'config_zicoins'
        // },
        {
          name:'Configure Feedback',
          icon:'pi pi-cog',
          method : 'config_feedback'
        },
        // {
        //   name:'Send Payment Link',
        //   icon:'pi pi-external-link',
        //   method : 'pay_link'
        // },
        {
          name:'View Terminals',
          icon:'pi pi-external-link',
          method : 'view_terminals'
        },
        // {
        //   name:'Edit Store Details',
        //   icon:'pi pi-book',
        //   method : 'edit_merchant'
        // },
        // {
        //   name:'Add Store User',
        //   icon:'pi pi-user-edit',
        //   method : 'add_edit_user'
        // }

      ]

      this.actionitemsMethodSubM = (subprim) => {
        return [

      //   {label: 'Change Password', icon: 'pi pi-cog', command: (event) => {

      //     if(subprim.users.length ===0){

      //       this.showError('First add User')

      //     } else {

      //       console.log(subprim.path)
      //       let str:string = subprim.path
      //       let strarr = str.substr(1).split('/')
      //       var parent
      //       var child
      //       console.log(strarr)
      //       if(strarr.length===2){
      //             parent = strarr[0]
      //             child = strarr[1]
      //       } else {
      //         parent = strarr[0]
      //         child = null
      //       }


      //       this.router.navigate(['/zitharamerchants/submercpass',subprim.users[0].id,parent,child])
      //       console.log(subprim)
      //     }


      //     // this.router.navigate(['/zitharamerchants/submercpass',prim.id])

      // }},
    //   {label: 'Configure Zicoins', icon: 'pi pi-cog', command: (event) => {
    //     console.log(subprim.path)
    //     let str:string = subprim.path
    //     let strarr = str.substr(1).split('/')
    //     var parent
    //     var child
    //     console.log(strarr)
    //     if(strarr.length===2){
    //           parent = strarr[0]
    //           child = strarr[1]
    //     } else {
    //       parent = strarr[0]
    //       child = null
    //     }


    //     this.router.navigate(['/zitharamerchants/zicoinconfig',subprim.id,parent,child])
    //     console.log(subprim)
    //     // this.router.navigate(['/zitharamerchants/submercpass',prim.id])

    // }},
  //   {label: 'Send Payment Link', icon: 'pi pi-cog', command: (event) => {

  //     if(this.smallscreen){
  //       this.showPositionDialog('bottom',subprim.id)
  //     } else {
  //       this.showPositionDialog('bottom',subprim.id)
  //     }

  //     this.checkValues()



  // }},
  {label: 'View Terminals', icon: 'pi pi-cog', command: (event) => {


    this.router.navigate(['/zitharamerchants/terminals',subprim.id])

  }},
    {label: 'Configure Feedback', icon: 'pi pi-cog', command: (event) => {
        console.log(subprim.path)
        let str:string = subprim.path
        let strarr = str.substr(1).split('/')
        var parent
        var child
        console.log(strarr)
        if(strarr.length===2){
              parent = strarr[0]
              child = strarr[1]
        } else {
          parent = strarr[0]
          child = null
        }


        this.router.navigate(['/zitharamerchants/addfeedback',subprim.id,parent,child])
        // console.log(subprim)
        // this.router.navigate(['/zitharamerchants/submercpass',prim.id])

    }},

  // {label: 'Edit Store Details' , icon: 'pi pi-cog', command: (event) => {

  //   this.zithApiService.getSubMerchantDetails(subprim.id).subscribe(
  //     (res:UpdateSubMerchant) => {
  //        res.id = subprim.id
  //       this.show(  'Edit Store Details: ' + subprim.name,res)
  //     },
  //     (error:Error) => {
  //       this.showError(error.message)
  //     }


  //   )


  //  }

  // },
//   {label: subprim.users.length ===0 ? 'Add Store User': 'Edit Store User', icon: 'pi pi-cog', command: (event) => {
//     if(subprim.users.length ===0){
//       var userinfo  = new UpdateUserInfo()
//       this.showUserInfo('Add Store User: '+ subprim.name,userinfo,subprim.id,true)

//     } else {
//       var userinfo : UpdateUserInfo  = subprim.users[0]
//       this.showUserInfo('Edit Store User: '+ subprim.name,userinfo,subprim.id,false)
//     }

// }},
      ] }

      this.breakpointObserver.observe([
        '(max-width: 960px)'
          ]).subscribe(result => {
            if (result.matches) {
              this.smallscreen = true
              this.dialogwidth = '90%'
            } else {
              // if necessary:
              this.smallscreen = false
              this.dialogwidth = '350px'
            }
          });

          // this.getZitharaUsers(1,5)
        }

  showPositionDialog(position: string, merchantid) {
    this.position = position;
    this.displayPosition = true;
    this.paymentlinkmerchantid = ''
    this.phonepayment = undefined
    this.amountpaymentlink = null
    this.paymentlinkmerchantid = merchantid
}

cancelPaymentLink(){
this.displayPosition = false
this.paymentlinkform = false
this.paymentlinkmerchantid = ''
this.phonepayment = undefined
this.amountpaymentlink = null

}

// sendPaymentLink(){
//   this.paymentlinkform['merchantid'] = this.paymentlinkmerchantid
//   this.paymentlinkform['phone'] = this.phonepayment
//   this.paymentlinkform['amount'] = this.amountpaymentlink

//   this.zithApiService.sendPaymentLink(this.phonepayment,this.amountpaymentlink,this.paymentlinkmerchantid)
//   .subscribe(data => {
//     this.showSuccess('Payment link sent to ' + this.phonepayment)
//     this.displayPosition = false
//   }, error => {
//     this.showError('Payment link is disabled')
//   });

//   console.log(this.paymentlinkform)

// }

showSuccess(message) {
  this.toastr.success(message);
}

showError(message) {
  this.toastr.error(message);
}


  loadSubMerchants(event: LazyLoadEvent, searchval = null) {
    console.log(event)
    if(event===undefined || event===null){
      event = this.lastLazyLoadEvent
    }

    this.page = Math.round(event.first/event.rows) +1
    this.pageSize = event.rows

    this.loading = true;
    this.lastLazyLoadEvent = event

    this.getZitharaUsersByPrim(searchval)




    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
    // setTimeout(() => {
    //     if (this.submdatasource) {

    //         this.currentPage =  Math.round(event.first/event.rows)+1,
    //         this.currentSize =  event.rows
    //         this.submerchantdata = this.submdatasource.slice(event.first, (event.first + event.rows));
    //         this.loading = false;
    //     }
    // }, time);
  }


  getZitharaUsersByPrim(search = null): void {
    this.loading = true
    this.submdatasource = [];
    this.zithApiService.getUsersByPrim(this.page,this.pageSize,this.parentMerchantId, search)
    .subscribe(data => {
      this.priMerchantName = (data.body.data[0].path.substr(1).split('/'))[0]
      this.submdatasource = data.body.data
      this.submerchantdata = this.submdatasource
      console.log(this.submdatasource)
      this.collectionSize = data.body.total;
      this.loading = false;
      // console.log(this.merchantData);
    }, error => {

    });
  }

@HostListener('click',["$event"])
onClick(value) {

  let str = value.target.className.toString()
  if(!(str.includes('p-splitbutton-menubutton') || str.includes('pi-chevron-down') )){
    this.drdwnsubm['_results'].filter(va => va['menu']['visible']).forEach(val => {
      val.onDropdownButtonClick(null)
      }  )

  }
}

update(event) {
  let run = '';

  // console.log(event)
  try {
    if( run ===''){
      run = event.target.parentNode.id
    }
    if( run ===''){
      run = event.target.parentNode.parentNode.id
    }
    if( run ===''){
      run = event.target.parentNode.parentNode.parentNode.id
    }

    if( run ===''){
      throw('id not found')
    }


  } catch (error) {

  }

  // event.stopPropagation();
  // console.log(this.drdwn['_results']);
  if(event!==null ){
    this.drdwnsubm['_results'].filter(va => va['menu']['visible'] && run !== va.containerViewChild.nativeElement.parentNode.id ).forEach(val => {
      // console.log('start',val.containerViewChild.nativeElement.parentNode.id,'<--id-->', run,'end')
      // console.log('elemrefid',val.nativeElement.id);
      val.onDropdownButtonClick(null)
      // (val as HTMLElement).onDropdownClick();
      }  )
  }


  // this.drdwn['_results'][0].onDropdownButtonClick()
}

activateDeactive(id): void {
  // console.log(id);
  const activateDeactivateData = {id: ''};
  activateDeactivateData.id = id;
  // console.log(activateDeactivateData);
  this.zithApiService.activateDeactivate(activateDeactivateData)
  // tslint:disable-next-line: no-shadowed-variable
  .subscribe(data => {
    // this.merchantData = data.data;
    // console.log(this.merchantData);
    this.getZitharaUsersByPrim();
  }, error => {

  });
}

checkValues(){


  let catch0 = 1
  try{
    catch0 = parseInt(this.amountpaymentlink)
  } catch{
    catch0 = 1
  }

  if(  (this.phonepayment===undefined ? true : this.phonepayment.length!==10) || (this.amountpaymentlink=== null || this.amountpaymentlink=== undefined) || this.amountpaymentlink==='0' || this.amountpaymentlink==='' || catch0 === 0) {
    this.validators=true
  } else {
    this.validators = false
  }


}

createSubMerchantUser(){

}

ref: DynamicDialogRef;

// show(header:string, merchant:UpdateSubMerchant) {
//     this.ref = this.dialogService.open(EditSubMerchantComponent, {
//         header: header,
//         width: '70%',
//         contentStyle: {"max-height": "500px", "overflow": "auto"},
//         baseZIndex: 10000,
//         data : {merchant : merchant},
//         dismissableMask : true
//     });

//     this.ref.onClose.subscribe((response) =>{
//       console.log(response)
//       if (response['success']) {
//           this.showSuccess(response['message'])
//           // this.loadPrimMerchants(undefined)
//           this.getZitharaUsersByPrim();
//       }
//   });
// }

// showUserInfo(header:string, userinfo:UpdateUserInfo,subMerchantID : string, add : boolean) {
//   this.ref = this.dialogService.open(EditSubUserInfoComponent, {
//       header: header,
//       width: '70%',
//       contentStyle: {"max-height": "500px", "overflow": "auto"},
//       baseZIndex: 10000,
//       data : {userinfo : userinfo, parentMerchantID: this.parentMerchantId,subMerchantID:subMerchantID  ,add : add},
//       dismissableMask : true
//   });

//   this.ref.onClose.subscribe((response) =>{
//     console.log(response)
//     if (response['success']) {
//         this.showSuccess(response['message'])
//         // this.loadPrimMerchants(undefined)
//         this.getZitharaUsersByPrim();

//     }
// });
// }


togglesidebar(header:string,subprim){
  this.sidebarprim = subprim
  // this.options[4].name = subprim.users.length ===0 ? 'Add User' : 'Edit User'

  this.visibleSidebar4 = true
this.sidebarheader = 'Actions: ' + header
}

exec(cmd:string){

  console.log(cmd)
  var subprim = this.sidebarprim
  switch(cmd) {
    case 'chg_psswd':
      // code block
      if(subprim.users.length ===0){

        this.showError('First add User')

      } else {

        console.log(subprim.path)
        let str:string = subprim.path
        let strarr = str.substr(1).split('/')
        var parent
        var child
        console.log(strarr)
        if(strarr.length===2){
              parent = strarr[0]
              child = strarr[1]
        } else {
          parent = strarr[0]
          child = null
        }


        this.router.navigate(['/zitharamerchants/submercpass',subprim.users[0].id,parent,child])
        console.log(subprim)
      }

      break;
    case 'config_zicoins':
      console.log(subprim.path)
      let mystr:string = subprim.path
      let mystrarr = mystr.substr(1).split('/')
      var parent
      var child
      console.log(mystrarr)
      if(mystrarr.length===2){
            parent = mystrarr[0]
            child = mystrarr[1]
      } else {
        parent = mystrarr[0]
        child = null
      }



      this.router.navigate(['/zitharamerchants/zicoinconfig',subprim.id,parent,child])
      console.log(subprim)

      // code block
      break;

    case 'config_feedback':
      console.log(subprim.path)
      let str:string = subprim.path
      let strarr = str.substr(1).split('/')
      var parent
      var child
      console.log(strarr)
      if(strarr.length===2){
            parent = strarr[0]
            child = strarr[1]
      } else {
        parent = strarr[0]
        child = null
      }



      this.router.navigate(['/zitharamerchants/addfeedback',subprim.id,parent,child])
      console.log(subprim)

      // code block
      break;

    case 'view_terminals':
      this.router.navigate(['/zitharamerchants/terminals',subprim.id])
      // code block
      break;
  }



  this.visibleSidebar4 = false
}


// clickMerchantProfile(){

//   this.zithApiService.getPrimMerchantDetails(this.parentMerchantId).subscribe(
//     (res:UpdatePrimMerchant) => {
//       res.id = this.parentMerchantId
//       this.showMerchantDetails('Edit Merchant Details: '+this.priMerchantName,res)
//     },
//     (error:Error) => {
//       this.showError(error.message)
//     }


//   )

// }


// showMerchantDetails(header:string, merchant:UpdatePrimMerchant) {
//   this.ref = this.dialogService.open(EditParentMerchantComponent, {
//       header: header,
//       width: '70%',
//       contentStyle: {"max-height": "500px", "overflow": "auto"},
//       baseZIndex: 10000,
//       data : {merchant : merchant},
//       dismissableMask : true
//   });

//   this.ref.onClose.subscribe((response) =>{
//     console.log(response)
//     if (response['success']) {
//         this.showSuccess(response['message'])

//     }
// });
// }

// showAdminUserInfo(header:string, userinfo:UpdateUserInfo,parentMerchantID : string, add : boolean) {
//   header = 'Edit Admin User: ' + this.merchantData.name
//   userinfo = this.merchantData.users[0]
//   parentMerchantID = this.merchantData.id
//   add = false
//   this.ref = this.dialogService.open(EditUserInfoComponent, {
//       header: header,
//       width: '70%',
//       contentStyle: {"max-height": "500px", "overflow": "auto"},
//       baseZIndex: 10000,
//       data : {userinfo : userinfo, parentMerchantID:parentMerchantID,add : add},
//       dismissableMask : true
//   });

//   this.ref.onClose.subscribe((response) =>{
//     console.log(response)
//     if (response['success']) {
//         this.showSuccess(response['message'])
//         this.merchantData[0] = []
//     }
// });
// }

getZitharaUsers(page, pageSize): void {
  // this.loading = true

  // this.zithApiService.getUsers(page, pageSize)
  // // tslint:disable-next-line: no-shadowed-variable
  // .subscribe(data => {
  //   this.merchantData = data.data[0];
  //   this.collectionSize = data.total;
  //   this.loading = false;
  //   // console.log('Merchant Data ',this.merchantData);
  // }, error => {

  // });
}



changeAdminPassword(){

  let str:string = this.merchantData.path
  let strarr = str.substr(1).split('/')
  var parent
  var child
  console.log(strarr)
  if(strarr.length===2){
        parent = strarr[0]
        child = strarr[1]
  } else {
    parent = strarr[0]
    child = ''
  }


  this.router.navigate(['/zitharamerchants/submercpass',this.merchantData.users[0].id,parent,child])
  // console.log(prim)
}

}





