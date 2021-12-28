import { Component, OnInit, Output, ViewChild, ElementRef, Renderer2, ViewChildren, QueryList, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ZithapiService } from '../../../shared/services/zithapi.service';
import { Observable } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { PrimMerchant } from '../../../model/prim-merchant';
import { Role } from '../../../model/roles';
import { UpdatePrimMerchant } from '../../../model/update-prim-merchant';
import { UpdateUserInfo } from '../../../model/user-info';
import { RoleService } from '../../../services/role.service';
import { PrimMerchantService } from '../../../shared/services/get-prim-merchantservice';

export interface NgbPanelChangeEvent {
  nextState: boolean;
  panelId: string;
  preventDefault: () => void;
}

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss']
})
export class MerchantsComponent implements OnInit,OnDestroy {
  @ViewChildren('drdwn') drdwn: QueryList<ElementRef>
  public searchValue = '';
  public items: Array<any>;
  // tslint:disable-next-line: variable-name
  public age_filtered_items: Array<any>;
  // tslint:disable-next-line: variable-name
  public name_filtered_items: Array<any>;
  public user: any;
  public age: any;
  public sidebaron: any;
  public listView: any;
  lastPanelId: string = null;
  defaultPanelId = 'panel1';
  merchantData = [];
  public isMerchantCollapsed = -1;
  public isSubMerchantCollapsed = -1;
  public isNewProfile: any;
  public Role = Role;
  currentPage = 1;
  itemsPerPage: number;
  previousPage: any;
  totalItems: any;
  transactionsDataCount: any;
  premiumData : any[] = [];
  paginateData: any[] = [];
  source$: Observable<any>;
  page = 1;
  pageSize = 5;
  collectionSize = 0;
  totalRecords: number;
  datasource: PrimMerchant[];
  merchantselected : boolean = false;
  showtable = false
  searchterm = ""
  sidebarheader = ""
  options = []

  actionitemsMethod: (prim: any) => { label: string; icon: string; command: (event: any) => void; }[];
  actionitemsMethodSubM: (subm: any) => { label: string; icon: string; command: (event: any) => void; }[];
  submerchantdata = []
  collectionSizeSubMerchants: number;
  submdatasource: any;
  lastLazyLoadEvent: LazyLoadEvent;
  smallscreen: boolean;
  visibleSidebar4: boolean;
  sidebarprim: any;


  constructor(private router: Router,
              private toastr: ToastrService,
              private zithApiService: ZithapiService,
              private primerchantService: PrimMerchantService, private primengConfig: PrimeNGConfig,
              private roleService:RoleService,
              public dialogService: DialogService,
              public breakpointObserver:BreakpointObserver
            ) { }

  ngOnInit() {

    this.breakpointObserver.observe([
      '(max-width: 960px)'
        ]).subscribe(result => {
          if (result.matches) {
            this.smallscreen = true
          } else {
            // if necessary:
            this.smallscreen = false
          }
        });
    ﻿

    this.initMerchant()


  this.loading = true;
  this.primengConfig.ripple = true;

  this.options = [
    {
      name:'Change Admin Password',
      icon:'pi pi-lock',
      method : 'chg_psswd'
    },
    // {
    //   name:'Add Store',
    //   icon:'pi pi-cog',
    //   method : 'add_store'
    // },
    {
      name:'View Stores',
      icon:'pi pi-th-large',
      method : 'viewstores'
    },
    // {
    //   name:'Edit Merchant Details',
    //   icon:'pi pi-book',
    //   method : 'edit_merchant'
    // },
    // {
    //   name:'Add Admin User',
    //   icon:'pi pi-user-edit',
    //   method : 'add_edit_admin'
    // }

  ]

  this.actionitemsMethod = (prim) => {
    return [

    {label: 'Change Admin Password', icon: 'pi pi-lock', command: (event) => {

      if(prim.users.length ===0){

        this.showError('First add Admin User')

      } else {

        console.log(prim.path)
        let str:string = prim.path
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


        this.router.navigate(['/zitharamerchants/submercpass',prim.users[0].id,parent,child])
        console.log(prim)
      }



  }},
//   {label: 'Add Store', icon: 'pi pi-cog', command: (event) => {
//     console.log(prim)
//     this.router.navigate(['/zitharamerchants/csubmerc',prim.id])

// }},
{label: 'View Stores', icon: 'pi pi-th-large', command: (event) => {
  // console.log(prim)
  // this.merchantselected = true
  // console.log(prim['subGroups']
  this.router.navigate(['/zitharamerchants/esubmerc',prim.id,prim.users[0].id])
  // this.onRowClick(prim['subGroups'])

}},
// {label: 'Edit Merchant Details' , icon: 'pi pi-book', command: (event) => {

//    this.zithApiService.getPrimMerchantDetails(prim.id).subscribe(
//      (res:UpdatePrimMerchant) => {
//         res.id = prim.id
//        this.show('Edit Merchant Details: '+prim.name,res)
//      },
//      (error:Error) => {
//        this.showError(error.message)
//      }


//    )


//   }

//  },
// {label: prim.users.length ===0 ? 'Add Admin User' : 'Edit Admin User' , icon: 'pi pi-user-edit', command: (event) => {

//  if(prim.users.length ===0){
//    var userinfo  = new UpdateUserInfo()
//    this.showUserInfo('Add Admin User: '+prim.name,userinfo,prim.id,true)

//  } else {
//    var userinfo : UpdateUserInfo  = prim.users[0]
//    this.showUserInfo('Edit Admin User: '+prim.name,userinfo,prim.id,false)

//  }

// }},
// {label: 'Upload Documents' , icon: 'pi pi-file-o', command: (event) => {
//   this.router.navigate(['/zitharamerchants/uploaddoc',prim.id])
// }}

] };


  }


  //


  //

  initMerchant(){
    this.zithApiService.getUserRolesKC().subscribe((data:Array<String>) => {
      if(data.includes(Role.SuperUser)){

        this.showtable = true
        console.log('superuser')
        this.getZitharaUsers(this.page, this.pageSize);


        //datasource imitation
        this.primerchantService.getCustomersLarge().then(data => {
          this.datasource = data;
          this.totalRecords = data.length;
          console.log('length--->', this.totalRecords)
      });


      } else if(data.includes(Role.Admin)){
        console.log('admin')
        this.roleService.getUserid().then(valuser => {
        // console.log(val)
        this.roleService.getPrimeid().then(valgroup => {
          this.router.navigate(['/zitharamerchants/esubmerc',valgroup,valuser])

        })


        }  )

      } else {
        console.log('not authorized')
        this.router.navigate(['/dashboard'])

      }


    }, error => {

    });
   }

  getZitharaUsers(page, pageSize): void {
    this.loading = true
    this.merchantData = [];
    this.zithApiService.getUsers(page, pageSize)
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.merchantData = data.data;
      this.collectionSize = data.total;
      this.loading = false;
      // console.log(this.merchantData);
    }, error => {

    });
  }

  createMerchantUser(merchant) {

  }

  createSubMerchant(merchant) {

  }

  activateDeactive(id): void {
    // console.log(id);
    const activateDeactivateData = {id: ''};
    activateDeactivateData.id = id;
    // console.log(activateDeactivateData);
    this.zithApiService.activateDeactivate(activateDeactivateData)
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.merchantData = data.data;
      // console.log(this.merchantData);
      this.getZitharaUsers(1,5);
    }, error => {

    });
  }

  panelShadow($event: NgbPanelChangeEvent, shadow) {
    // console.log($event);

    const { nextState } = $event;

    const activePanelId = $event.panelId;
    const activePanelElem = document.getElementById(activePanelId);

    if (!shadow.isExpanded(activePanelId)) {
      activePanelElem.parentElement.classList.add('open');
    }

    if (!this.lastPanelId) { this.lastPanelId = this.defaultPanelId; }

    if (this.lastPanelId) {
      const lastPanelElem = document.getElementById(this.lastPanelId);

      if (this.lastPanelId === activePanelId && nextState === false) {
        activePanelElem.parentElement.classList.remove('open');
      } else if (this.lastPanelId !== activePanelId && nextState === true) {
        lastPanelElem.parentElement.classList.remove('open');
      }

    }

    this.lastPanelId = $event.panelId;
  }

  primmerchants: PrimMerchant[];

  selectedCustomers: PrimMerchant[];

  actionitems;

  statuses: any[];

  loading: boolean = true;

  checked

  @ViewChild('dt') table: Table;



  onActivityChange(event) {
    const value = event.target.value;
    if (value && value.trim().length) {
        const activity = parseInt(value);

        if (!isNaN(activity)) {
            this.table.filter(activity, 'activity', 'gte');
        }
    }
}

onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'date', 'equals')
}

formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
}




loadPrimMerchants(event: LazyLoadEvent,searchval = null) {
  console.log(event)
  if(event===undefined || event===null){
    event = this.lastLazyLoadEvent
  }

  // if(event.sortField===undefined){
  //   event.sortField = 'name'
  // }

  this.loading = true;


  // if(this.lastLazyLoadEvent === undefined){
  //   this.lastLazyLoadEvent = event
  // }


  // if(((event.sortField===this.lastLazyLoadEvent.sortField)) && (event.sortOrder !== this.lastLazyLoadEvent.sortOrder) && (event.first ===this.lastLazyLoadEvent.first) && (event.rows ===this.lastLazyLoadEvent.rows) && event.sortField !== undefined ){

  //   this.primmerchants.sort(this.dynamicSort(event.sortField,event.sortOrder))
  //   this.lastLazyLoadEvent = event

  //   this.loading = false;
  // } else {
    this.lastLazyLoadEvent = event
    console.log('sortUNchange')
    this.merchantData = [];
    this.page = Math.round(event.first/event.rows)
    this.pageSize = event.rows
    this.zithApiService.getUsers(  this.page+1, event.rows, searchval)
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.primmerchants = data.data;
      // if(event.sortField !== undefined){
      //   this.primmerchants.sort(this.dynamicSort(event.sortField,event.sortOrder))
      // }
      // console.log(this.primmerchants[0]['users'][0]['firstName'])
      this.collectionSize = data.total;
      this.loading = false;
      // console.log(this.merchantData);
    }, error => {

    });







  //in a real application, make a remote request to load data using state metadata from event
  //event.first = First row offset
  //event.rows = Number of rows per page
  //event.sortField = Field name to sort with
  //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
  //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

  //imitate db connection over a network
  // setTimeout(() => {
  //     if (this.datasource) {


  //         this.primmerchants = this.datasource.slice(event.first, (event.first + event.rows));
  //         this.loading = false;
  //     }
  // }, 1000);
}

dynamicSort(property,order) {
  var sortOrder = order;
  return function (a,b) {

      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
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
    this.drdwn['_results'].filter(va => va['menu']['visible'] && run !== va.containerViewChild.nativeElement.parentNode.id ).forEach(val => {
      // console.log('start',val.containerViewChild.nativeElement.parentNode.id,'<--id-->', run,'end')
      // console.log('elemrefid',val.nativeElement.id);
      val.onDropdownButtonClick(null)
      // (val as HTMLElement).onDropdownClick();
      }  )
  }


  // this.drdwn['_results'][0].onDropdownButtonClick()
}

@HostListener('click',["$event"])
onClick(value) {

  let str = value.target.className.toString()
  if(!(str.includes('p-splitbutton-menubutton') || str.includes('pi-chevron-down') )){
    this.drdwn['_results'].filter(va => va['menu']['visible']).forEach(val => {
      val.onDropdownButtonClick(null)
      }  )

  }
}

onRowClick(subGroup){

  this.submdatasource = subGroup
  console.log(this.submdatasource)

   this.collectionSizeSubMerchants = this.submdatasource.length

}

showSuccess(message) {
  this.toastr.success(message);
}

showError(message) {
  this.toastr.error(message);
}

ref: DynamicDialogRef;

// show(header:string, merchant:UpdatePrimMerchant) {
//     this.ref = this.dialogService.open(EditParentMerchantComponent, {
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
//           this.loadPrimMerchants(undefined)
//       }
//   });
// }

// showUserInfo(header:string, userinfo:UpdateUserInfo,parentMerchantID : string, add : boolean) {
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
//         this.loadPrimMerchants(undefined)
//     }
// });
// }

    ngOnDestroy() {
      if (this.ref) {
          this.ref.close();
      }
    }


    togglesidebar(header:string,prim){
      this.sidebarprim = prim
      // this.options[4].name = prim.users.length ===0 ? 'Add Admin User' : 'Edit Admin User'

      this.visibleSidebar4 = true
    this.sidebarheader = 'Actions: ' + header
    }

    exec(cmd:string){
      console.log(cmd)
      var prim = this.sidebarprim
      switch(cmd) {
        case 'chg_psswd':
          // code block
          if(prim.users.length ===0){

            this.showError('First add Admin User')

          } else {

            // console.log(prim.path)
            let str:string = prim.path
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


            this.router.navigate(['/zitharamerchants/submercpass',prim.id,parent,child])
            console.log(prim)
          }
          break;
        case 'add_store':
          // console.log(prim)
          // this.router.navigate(['/zitharamerchants/csubmerc',prim.id])
          // code block
          break;
        case 'viewstores':
          this.router.navigate(['/zitharamerchants/esubmerc',prim.id,prim.users[0].id])
          // code block
          break;
        case 'edit_merchant':
          // code block
          // this.zithApiService.getPrimMerchantDetails(prim.id).subscribe(
          //   (res:UpdatePrimMerchant) => {
          //      res.id = prim.id
          //     this.show('Edit Merchant Details: '+prim.name,res)
          //   },
          //   (error:Error) => {
          //     this.showError(error.message)
          //   }


          // )
          break;
        case 'add_edit_admin':
      //     if(prim.users.length ===0){
      //       var userinfo  = new UpdateUserInfo()
      //       this.showUserInfo('Add Admin User: '+prim.name,userinfo,prim.id,true)

      //     } else {
      //       var userinfo : UpdateUserInfo  = prim.users[0]
      //       this.showUserInfo('Edit Admin User: '+prim.name,userinfo,prim.id,false)

      //     }
      //     // code block
      //     break;
      // }



      this.visibleSidebar4 = false
    }
  }




}
