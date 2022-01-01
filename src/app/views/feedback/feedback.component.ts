import { Component, OnInit, ViewEncapsulation, ViewChildren, QueryList, ElementRef, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ZithapiService } from '../../shared/services/zithapi.service';
import { Observable } from 'rxjs';
import { LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgxHowlerService } from 'ngx-howler'
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { Role } from '../../model/roles';
import { RoleService } from '../../services/role.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackComponent implements OnInit,OnDestroy {
  form: FormGroup;
  // merchantListSettings: IDropdownSettings = {};
  // subMerchantListSettings: IDropdownSettings = {};
  public subMerchantsData: any;
  public selectedSubMerchants: any;
  public merchantsData: any;
  public selectedMerchants: any;
  active = 0;
  public max = new Date();
  transactionsData: any;
  currentPage = 1;
  itemsPerPage: number;
  previousPage: any;
  totalItems: any;
  transactionsDataCount: any;
  premiumData : any[] = [];
  paginateData: any[] = [];
  source$: Observable<any>;
  page = 0;
  pageSize = 5;
  collectionSize = 0;
  public Role = Role;
  loading: boolean = true;
  visibleSidebar4;
  visibleDateBar;
  visibleStore;
  today = new Date()
  initstart = new Date()
  displayOTP = false;
  inputOTP

  dateRangenew = [this.initstart, this.today]
  @ViewChild('dtrange') dtrange;
  @ViewChild('selmerchant') selmerchant;
  @ViewChild('selsubmerchant') selsubmerchant;
  showmerdrp;
  dropmerelem: any;
  smallscreen: boolean;
  sidebarheader: string;
  columns: string[];
  alltransactionsData: any[];
  columnscode: string[];
  cols: { field: string; header: string; }[];
  exportColumns: { title: string; dataKey: string; }[];
  colarray: string[];
  disableDownload = true
  totaltrans: any;
  pdftransactionsData: any;
  xlalltransactionsData: any;
  refundcount: any;
  otpMessage: any;
  lastLazyLoadEvent: LazyLoadEvent;
  searchterm : string;
  showtable: boolean = false;
  display: boolean = false;
  dialogtitle: string;
  dialogdata: {};
  showdialogdata: boolean;
  value1 :string = 'off'
  showfirst:boolean = false
  stateOptions: { label: string; value: string; }[];
  source = new EventSource(this.zithApiService.getStreamMessagesURL);
  eventlisten: void;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  avg_feedback: number;
  feedback_chart:EChartsOption;

  constructor(private formbuilder: FormBuilder, private router: Router,
    private toastr: MessageService,
    private zithApiService: ZithapiService,
    private roleService: RoleService,
    private primengConfig: PrimeNGConfig,
    private ngxHowlerService: NgxHowlerService,
    private breakpointObserver: BreakpointObserver) {
    this.ngxHowlerService.loadScript('https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.0/howler.min.js');
    this.stateOptions = [{label: 'Off', value: 'off'}, {label: 'On', value: 'on'}];


  }
  ngOnDestroy(): void {

  }

  showDialog() {
    this.display = true;
}

hideDialog(){
  this.dialogdata = {}
  this.showdialogdata = false
}

  ngOnInit(): void {

    this.initMerchant()
    // this.initstart.setDate(this.initstart.getDate() - 1)
    // this.source$.subscribe();
    this.form = this.formbuilder.group({
      eventName: new FormControl('transactionsdatepicker'),
      dateRange: new FormControl([new Date(), new Date()])
    });


    // this.merchantListSettings = {
    //   singleSelection: true,
    //   showApply: false,
    //   showCancel: false,
    //   idField: 'id',
    //   textField: 'name',
    //   itemsShowLimit: 5,
    //   clearSearchFilter: true,
    //   noDataAvailablePlaceholderText: 'No Merchants',
    //   searchPlaceholderText: 'Search Merchants',
    //   allowSearchFilter: true
    // };
    // this.subMerchantListSettings = {
    //   singleSelection: false,
    //   showApply: true,
    //   showCancel: true,
    //   idField: 'id',
    //   textField: 'name',
    //   selectAllText: 'Select All Sub Merchants',
    //   unSelectAllText: 'UnSelect All Sub Merchants',
    //   itemsShowLimit: 5,
    //   clearSearchFilter: true,
    //   noDataAvailablePlaceholderText: 'No Sub Merchants',
    //   searchPlaceholderText: 'Search Sub Merchants',
    //   allowSearchFilter: true
    // };


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

        this.cols = [

          { field: 'custname', header: 'Customer Name ' },
          { field: 'phone', header: 'Phone ' },
          { field: 'freq', header: 'No. of Visits ' },
          { field: 'last_visit', header: 'Last Visit ' },
          { field: 'visit_pattern', header: 'Visit Pattern ' },
          { field: 'avg_trans', header: 'Avg. Transaction ' },
          { field: 'rating', header: 'Rating ' },
          { field: 'dw_areas', header: 'Working Well ' },
          { field: 'ni_areas', header: 'Needs Improvement ' }
      ];
      this.colarray = this.cols.map(col => col.header);
      this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

      } else if(data.includes(Role.Admin)){
        this.cols = [

          { field: 'custname', header: 'Customer Name ' },
          { field: 'phone', header: 'Phone ' },
          { field: 'freq', header: 'No. of Visits ' },
          { field: 'last_visit', header: 'Last Visit ' },
          { field: 'visit_pattern', header: 'Visit Pattern ' },
          { field: 'avg_trans', header: 'Avg. Transaction ' },
          { field: 'rating', header: 'Rating ' },
          { field: 'dw_areas', header: 'Working Well ' },
          { field: 'ni_areas', header: 'Needs Improvement ' }
      ];
      this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
        this.getAllSubMerchants()


      } else if(data.includes(Role.Shop)) {

        this.cols = [

          { field: 'custname', header: 'Customer Name ' },
          { field: 'phone', header: 'Phone ' },
          { field: 'freq', header: 'No. of Visits ' },
          { field: 'last_visit', header: 'Last Visit ' },
          { field: 'visit_pattern', header: 'Visit Pattern ' },
          { field: 'avg_trans', header: 'Avg. Transaction ' },
          { field: 'rating', header: 'Rating ' },
          { field: 'dw_areas', header: 'Working Well ' },
          { field: 'ni_areas', header: 'Needs Improvement ' }
      ];
      this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

        this.roleService.getPrimeid().then(val => {
          console.log(val)
          this.selectedSubMerchants = []
          this.selectedSubMerchants = [{
            name: 'aa',
            id: val
          }];

          var submerchantids = Array.from(this.selectedSubMerchants).map(obj => obj['id'])
          this.getTransactions(undefined);

        }  )

    } else {

      this.roleService.getPrimeid().then(val => {
        console.log(val)
        this.selectedSubMerchants = undefined
        this.getTransactions(undefined);

      }  )
    }


  }, error => {

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
    this.showfirst=true
    // this.zithApiService.getPrimaryMerchants()
    // // tslint:disable-next-line: no-shadowed-variable
    // .subscribe(data => {
    //   this.merchantsData = data.body.data;
    //   this.selectedMerchants = this.merchantsData[0].id;
    //   console.log(this.selectedMerchants[0].id);
    //   console.log('selected---->',this.selectedMerchants)
    //   this.getSubMerchantsByParents(this.merchantsData[0].id)
    //   console.log('all merchants---->',this.merchantsData);
    // }, error => {

    // });
  }

  getAllSubMerchants(): void {
    this.zithApiService.getSubMerchants()
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.subMerchantsData = data.body.data;
      this.selectedSubMerchants = data.body.data;
      var submerchantids = Array.from(data.body.data).map(obj => obj['id'])
      this.getTransactions(undefined);
      console.log(this.subMerchantsData);
    }, error => {

    });
  }

  stripName(str: string): string{
    var str1:string = ''
    if(str.length > 25){
      str1 = str.substr(16) + '...'
    }

    return str
  }

  getSubMerchantsByParents(selectedMerchant): void{
    if(this.roleService.hasRoleV2([Role.Admin,Role.SuperUser])){
      // console.log(selectedMerchant);
      this.zithApiService.getSubmerchantsByParentId(selectedMerchant.id)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(data => {
        this.subMerchantsData = data.body.data;
        this.selectedSubMerchants = data.body.data;
        var submerchantids = Array.from(data.body.data).map(obj => obj['id'])
        this.getTransactions( undefined);
        console.log(this.subMerchantsData);
      }, error => {

      });
    } else {
      this.getTransactions(undefined);

    }

  }

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

  getTransactions(event:LazyLoadEvent) {

    // console.log(event)
    this.loading = true;
    if(event!==undefined){
      this.page = Math.round(event.first/event.rows)+1
      this.pageSize = event.rows
    }

    const subMerchantsId = [];
    if(this.selectedSubMerchants!==undefined){
      this.selectedSubMerchants.forEach(element => {
        subMerchantsId.push(element.id);
      });
    }

    if(this.dateRangenew[1] === null || this.dateRangenew[1] === undefined ){
      this.dateRangenew[1] = this.dateRangenew[0]
    }
    const startDate = this.formatDate(this.fromDate);
    const endDate = this.formatDate(this.toDate);
    console.log('compare dates', this.fromDate > this.toDate)
    if(this.fromDate > this.toDate){
      this.showError('Invalid Date Range')
      this.loading = false
      return
    }

    console.log(startDate, endDate);

    if(subMerchantsId !== undefined){

      this.zithApiService.getFeedbacks(startDate, endDate, this.pageSize, Math.max(0,this.page-1) , subMerchantsId)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(data => {
        // console.log(data);
        this.showfirst = true
        this.showtable = true
        this.transactionsData = data.pages.content;
        this.avg_feedback = data.avg
        this.setChartOptions('feedback_chart')

        this.transactionsDataCount = data.pages.total;
        if(data.pages.total === 0){
          this.disableDownload = true
        } else {
          this.disableDownload = false
        }
        this.loading = false;
        // console.log(this.transactionsData);
      }, error => {

      });
    }
    }

  formatDate(date) {
    let currentDate = new Date(`${date}`);
    let todaydate= currentDate.getDate();
    let month= currentDate.getMonth();
    let year= currentDate.getFullYear();
    return year + '-' + ((month+1).toString()).padStart(2,'0') +'-'+ (todaydate.toString()).padStart(2,'0');
  }

  selectRange(){
    console.log(this.dateRangenew)
  }

  @HostListener('click',["$event.target"])
  onClick(value) {
    try {
      if(!(value.className.includes('p-dropdown'))){
        this.selmerchant.hide()

    }

    if(!(value.className.includes('p-multiselect'))){
      this.selsubmerchant.hide()
    }

  } catch {

  }

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

  showelem(rng){
    console.log('direct-->',rng)
    // rng.toggle()
  }

  closedt(dtrange){
    dtrange.hideOverlay()
    console.log(this.form.get('dateRange').value)
    const startDate = this.formatDate(this.form.get('dateRange').value[0]);
    const endDate = this.formatDate(this.form.get('dateRange').value[1]);
    console.log(startDate,endDate)
  }

  // disableoveralay(){
  //   console.log('hideoverlay')
  //   this.dtrange.datepickerClick = true;
  // }

  showMerchatndrp(selmerchant){
    this.showmerdrp = 1
    this.dropmerelem = selmerchant
    console.log(this.showmerdrp)
  }

  onClickOutside() {
    // console.log('1')
    // if(event && event['value'] === true) {
    //  console.log('clicked outside');
    // } else {
    //   console.log('clicked inside');
    // }
  }

  closemulti(){
    try {
      this.selsubmerchant.overlayVisible = false
    } catch (error) {

    }

    // selsubmerchant.hideOverlay();

  }

  onClickParentMerchant(elem){
    if(this.smallscreen){
    elem.hide()
    this.visibleSidebar4 = true
    this.sidebarheader = 'Select Parent Merchant'
    }

  }

  onClickSubMerchant(elem){
    if(this.smallscreen){
      elem.hide()
      this.visibleStore=true
    }
  }

  // onClickDateRange(elem){
  //   console.log('clicked')
  //   if(this.smallscreen){
  //     this.dtrange.toggle()
  //     this.visibleDateBar=true
  //   }
  // }

  getAlltransactions(){
    this.loading=true
    const subMerchantsId = [];
    if(this.selectedSubMerchants!==undefined){
      this.selectedSubMerchants.forEach(element => {
        subMerchantsId.push(element.id);
      });
    }

    const startDate = this.formatDate(this.fromDate);
    const endDate = this.formatDate(this.toDate);
  return  this.zithApiService.getTransactions(startDate, endDate, this.transactionsDataCount, 0, subMerchantsId)
    // tslint:disable-next-line: no-shadowed-variable

  }


showSuccess(message) {
  // this.toastr.success(message);
  this.toastr.add({key: 'myKey1', severity:'success', summary: 'Success', detail: message});
}

showError(message) {

  // this.toastr.error(message);
  this.toastr.add({key: 'myKey1', severity:'error', summary: 'Error', detail: message});
}

setChartOptions(chartname:string, options?:Array<any>){

  switch ( chartname ) {
    case 'feedback_chart':
      this.feedback_chart  = {
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 1,
            max: 5,
            splitNumber: 5,
            axisLine: {
              lineStyle: {
                // roundCap: true,
                width: 60,
                color: [
                  [0.20, '#F2383A'],
                  [0.40, '#FEAF00'],
                  [0.60, '#FEF000'],
                  [0.80, '#9FCC00'],
                  [1, '#1EA614']
                ]
              }
            },
            // pointer: {
            //   icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            //   length: '12%',
            //   width: 20,
            //   offsetCenter: [0, '-60%'],
            //   itemStyle: {
            //     color: 'auto'
            //   }
            // },
            axisTick: {
              length: 12,
              lineStyle: {
                color: 'auto',
                width: 0
              }
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: 'auto',
                width: 0
              }
            },
            axisLabel: {
              color: 'transparent',
              fontSize: 10,
              distance: -40,
              formatter: function (value) {
                if (value === 1) {
                  return '1';
                } else if (value === 2) {
                  return '2';
                } else if (value === 3) {
                  return '3';
                } else if (value === 4) {
                  return '4';
                } else if (value === 5) {
                  return '5';
                }
                return '';
              }
            },
            // title: {
            //   offsetCenter: [0, '-20%'],
            //   fontSize: 10
            // },
            detail: {
              // fontSize: 20,
              // offsetCenter: [0, '0%'],
              // valueAnimation: true,
              formatter: function (value) {
                return value + '/5';
              },
              color: 'auto'
            },
            data: [
              {
                value: parseFloat(this.avg_feedback.toFixed(2)),
                // name: 'Average Feedback'
              }
            ]
          }
        ]
      };
      break;
      }
}

stringToArray(str:string){

  var output : string[] = []

  if(str.length> 0){

    if(str.includes(",")){

      return str.split(",")

    } else {
      output.push(str)
      return output
    }

  } else {
    return output;
  }



}

hidy(event){
  console.log('hiding')
console.log(event)

}

filterMerchant(event) {
  //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  let filtered: any[] = [];
  let query = event.query;
  // console.log(event.query)

  this.zithApiService.searchPrimaryMerchants(event.query)
  .subscribe(data => {
    this.merchantsData = data.body.data;
    // this.selectedMerchants = this.merchantsData[0].id;
    // console.log(this.selectedMerchants[0].id);
    // console.log('selected---->',this.selectedMerchants)

    // console.log('all merchants---->',this.merchantsData);
  }, error => {

  });

}





}
