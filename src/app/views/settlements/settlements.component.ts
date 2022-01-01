import { Component, OnInit, Input, ViewEncapsulation, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ZithapiService } from '../../shared/services/zithapi.service';
import { Observable } from 'rxjs';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Role } from '../../model/roles';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-settlements',
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettlementsComponent implements OnInit {
  form: FormGroup;
  public subMerchantsData: any;
  public selectedSubMerchants: any;
  public merchantsData: any;
  public selectedMerchants: any;
  active = 0;
  public max = new Date();
  settlementsData: any;
  currentPage = 1;
  itemsPerPage: number;
  previousPage: any;
  totalItems: any;
  settlementsDataCount: any;
  premiumData : any[] = [];
  paginateData: any[] = [];
  source$: Observable<any>;
  page = 1;
  pageSize = 5;
  collectionSize = 0;
  closeResult: string;
  detailedTransactionsData: any;
  totalTransactionAmount: any;
  totalTransactionDate: any;
  settledTo: any;
  merchant_name: any;
  bankrefid: any;
  public Role = Role;
  loading: boolean = true;
  initstart = new Date()
  dateRangenew = [  this.initstart = new Date(), new Date()]
  smallscreen: boolean;
  visibleSidebar4
  visibleStore
  visibleDateBar
  sidebarheader = ''
  showtable = false;
  showfirst = false
  today = new Date()
  @ViewChild('dtrange') dtrange;
  @ViewChild('selmerchant') selmerchant;
  getrole: string;
  openDialog: boolean;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  totalSettlements: any;
  // @ViewChild('selsubmerchant') selsubmerchant;

  constructor(private formbuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private zithApiService: ZithapiService,
              private roleService: RoleService,
              private breakpointObserver: BreakpointObserver,
              private primengConfig: PrimeNGConfig) {
  }

  ngOnInit(): void {
    this.initMerchant()
    this.initstart.setDate(this.initstart.getDate() - 14)

    if (!(this.roleService.hasRole([Role.SuperUser,Role.Admin]))){
      this.router.navigate(['/']);
      }
    // this.source$.subscribe();
    this.form = this.formbuilder.group({
      eventName: new FormControl('settlementsdatepicker'),
      dateRange: new FormControl([new Date(), new Date()])
    });

    this.loading = true;
    this.primengConfig.ripple = true;

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


  }


  initMerchant(){
    this.zithApiService.getUserRolesKC().subscribe((data:Array<String>) => {
      if(data.includes(Role.SuperUser)){

        this.getAllParMerchants();

      } else if(data.includes(Role.Admin)){
        this.getrole = 'admin'
        this.roleService.getPrimeid().then(val => {
          this.selectedMerchants = val;
          this.getSettlements(undefined)
          this.showtable = true

        }  )

      } else {

        this.roleService.getPrimeid().then(val => {
          console.log(val)
          this.selectedSubMerchants = [{
            name: 'aa',
            id: val
          }];
        this.getSettlements(undefined);
        }  )

    }}, error => {

    });
   }



  loadPage(page: number): any {
    console.log(page);
  }
  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }

  public changePagesize(num: number): void {
  this.itemsPerPage = this.pageSize + num;
}

  navChanged(event) {
    console.log('navChanged', event);
  }

  onMerchantSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onMerchantDeselect(item: any) {
    console.log(item);
  }
  onFilterChange(item: any) {
    console.log(item);
  }
  getAllParMerchants(): void{
    this.zithApiService.getPrimaryMerchants()
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.merchantsData = data.body.data;
      if(Array.from(data.body.data).length > 0){
        this.selectedMerchants = this.merchantsData[0].id;
      }
      if(Array.from(data.body.data).length > 0){
        this.getSettlements(undefined);
      }

      this.showtable = true

    }, error => {

    });
  }


  // getSubMerchantsByParents(selectedMerchant): void{
  //   console.log(selectedMerchant[0].id);
  //   this.zithApiService.getSubmerchantsByParentId(selectedMerchant)
  //   // tslint:disable-next-line: no-shadowed-variable
  //   .subscribe(data => {
  //     this.subMerchantsData = data.body.data;
  //     this.selectedSubMerchants = data.body.data;

  //     console.log(this.subMerchantsData);
  //   }, error => {

  //   });
  // }

  // getAllSubMerchants(): void {
  //   this.zithApiService.getSubMerchants()
  //   // tslint:disable-next-line: no-shadowed-variable
  //   .subscribe(data => {
  //     this.subMerchantsData = data.body.data;
  //     this.selectedSubMerchants = data.body.data;
  //     this.settlementsData( undefined);
  //     console.log(this.subMerchantsData);
  //   }, error => {

  //   });
  // }

  reset() {
    console.log(this.form.value);
    this.form.reset({
      eventName: '',
      dateRange: new FormControl([]),
      dateSingle: new FormControl(),
    });
    console.log(this.form.value);
  }

  onGetData(event) {
    console.log("dfdfdfd");
  }

  getSettlements(event:LazyLoadEvent) {
    // page, pageSize, selectedSubMerchants
    this.loading = true
    if(event!==undefined){
      this.page = Math.round(event.first/event.rows)+1
      this.pageSize = event.rows
    }

    // console.log('selected',this.selectedSubMerchants);
    // const subMerchantsId = [];
    // if(this.selectedSubMerchants!==undefined){
    //   this.selectedSubMerchants.forEach(element => {
    //     subMerchantsId.push(element.id);
    //   });
    // }



    // console.log(subMerchantsId);
    console.log(this.form.get('dateRange'));

    // const startDate = this.formatDate(this.form.get('dateRange').value[0]);
    // const endDate = this.formatDate(this.form.get('dateRange').value[1]);
    const startDate = this.formatDate(this.fromDate);
    const endDate = this.formatDate(this.toDate);

    this.zithApiService.getSettlements(startDate, endDate, this.pageSize, this.page-1, this.selectedMerchants)
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      console.log(data);
      this.settlementsData = data.pages.content;
      this.totalSettlements = data.grand_total;
      this.settlementsDataCount = data.pages.total;
      console.log(this.settlementsData);
      this.loading = false
      this.showfirst = true

    }, error => {

    });
  }

  formatDate(date) {
    let currentDate = new Date(`${date}`);
    let todaydate= currentDate.getDate();
    let month= currentDate.getMonth();
    let year= currentDate.getFullYear();
    return year + '-' + ((month+1).toString()).padStart(2,'0') +'-'+ (todaydate.toString()).padStart(2,'0');
  }

  open(content, settlementTranDetails) {
    // console.log(settlementTranDetails);
    this.detailedTransactionsData = settlementTranDetails.transactions._children;
    this.totalTransactionAmount = settlementTranDetails.amount;
    this.totalTransactionDate = settlementTranDetails.updatedate;
    this.settledTo = settlementTranDetails.settledto;
    this.merchant_name = settlementTranDetails.merchant_name;
    this.bankrefid = settlementTranDetails.bankrefid;
    this.openDialog = true
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

  stripName(str: string): string{
    if(str.length > 22){
      str = str.substr(0,22) + '...'
    }

    return str
  }

  onClickParentMerchant(elem){

    if(this.smallscreen && this.getrole!=='admin' ){
    elem.hide()
    this.visibleSidebar4 = true
    this.sidebarheader = 'Select Parent Merchant'
    }
  }

  closeDialog(){
    this.openDialog = false
  }

  closedt(dtrange){
    dtrange.hideOverlay()
    console.log(this.form.get('dateRange').value)
    const startDate = this.formatDate(this.form.get('dateRange').value[0]);
    const endDate = this.formatDate(this.form.get('dateRange').value[1]);
    console.log(startDate,endDate)
  }

  // closemulti(){
  //   this.selsubmerchant.overlayVisible = false
  //   // selsubmerchant.hideOverlay();

  // }

  onClickSubMerchant(elem){
    if(this.smallscreen){
      elem.hide()
      this.visibleStore=true
    }
  }

  onClickDateRange(elem){
    console.log('clicked')
    if(this.smallscreen){
      this.dtrange.toggle()
      this.visibleDateBar=true
    }
  }

  @HostListener('click',["$event.target"])
  onClick(value) {

    if(this.getrole!=='admin'){
      if(!(value.className.includes('p-dropdown'))){
        this.selmerchant.hide()
      }
    }


    // if(!(value.className.includes('p-multiselect'))){
    //   this.selsubmerchant.hide()
    // }


    // console.log(value.parentNode.id)

    // console.log('condi',this.showmerdrp>1)
    // if(this.showmerdrp>1){
    //   console.log(this.selmerchant)
    //   this.selmerchant.overlayVisible=false
    // } else {
    //   this.showmerdrp = 2
    //   console.log(this.showmerdrp)
    // }
try{
    let j = 0;
    let el = value.parentNode
    while(j<10){
      // console.log(el.id)
      // if(el !== null){
      if(el.id ===''){
        el = el.parentNode
      } else {
        break
      }
      j = j + 1
    }
  // }



    if( !(el.id =='picker' ) && !this.smallscreen ){
      // console.log('executing')
      if(this.dtrange.overlayVisible){
        this.dtrange.toggle()
      }

    }
//     if(this.dtrange.overlayVisible){
// this.dtrange.overlayVisible = false;
//     }
  } catch {
  let a = 1
}


  }


}
