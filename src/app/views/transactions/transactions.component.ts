import { Component, OnInit, ViewEncapsulation, ViewChildren, QueryList, ElementRef, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ZithapiService } from '../../shared/services/zithapi.service';
import { Observable } from 'rxjs';
import { LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgxHowlerService } from 'ngx-howler'
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { Role } from '../../model/roles';
import { RoleService } from '../../services/role.service';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionsComponent implements OnInit,OnDestroy {
  form: FormGroup;
  otpMessage: string;
  inputOTP: string;
  @ViewChild('cd',{static:false}) private countdown:CountdownComponent
  notify: string;
  disableResend: boolean = true;

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
  // inputOTP

  transaction_img  = {
    "bob" : "../../../assets/img/upi_logo/bob.png",
    "rbl" : "../../../assets/img/upi_logo/rbl.png",
    "bhim" : "../../../assets/img/upi_logo/bhim.jpg",
    "allb" : "../../../assets/img/upi_logo/allbank.png",
    "au" : "../../../assets/img/upi_logo/aubank.jpg",
    "axis" : "../../../assets/img/upi_logo/axis.png",
    "bandhan" : "../../../assets/img/upi_logo/bandhan.png",
    "indus" : "../../../assets/img/upi_logo/indus.png",
    "kbl" : "../../../assets/img/upi_logo/kbl.png",
    "fed" : "../../../assets/img/upi_logo/fedral.jpg",
    "sbi" : "../../../assets/img/upi_logo/sbi.png",
    "citi" : "../../../assets/img/upi_logo/citi.png",
    "digi" : "../../../assets/img/upi_logo/dbs.jpg",
    "fc" : "../../../assets/img/upi_logo/fc.png",
    "gpay" : "../../../assets/img/upi_logo/gpay.png",
    "hsbc" : "../../../assets/img/upi_logo/hsbc.jpg",
    "icici" : "../../../assets/img/upi_logo/icici.jpg",
    "kotak" : "../../../assets/img/upi_logo/kotak.jpg",
    "paytm" : "../../../assets/img/upi_logo/paytm.png",
    "phonepe" : "../../../assets/img/upi_logo/phonepe.jpg",
    "sib_mirror" : "../../../assets/img/upi_logo/sib.jpg",
    "yesbank" : "../../../assets/img/upi_logo/yes.png",
  }

  dateRangenew = [this.initstart, this.today]
  @ViewChild('dtrange') dtrange;
  @ViewChild('selmerchant') selmerchant;
  @ViewChild('selsubmerchant') selsubmerchant;
  @ViewChild('selterminals') selterminals;
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
  lastLazyLoadEvent: LazyLoadEvent;
  searchterm : string;
  selectedTerminals: any;
  terminalsData: any;
  visibleTerminals: boolean;
  showtable: boolean = false;
  display: boolean = false;
  dialogtitle: string;
  dialogdata: {};
  showdialogdata: boolean;
  value1 :string = 'off'
  showfirst:boolean = false


  fileSource :string = 'https://transaction-audio.s3.ap-south-1.amazonaws.com/test/tt.1e365ae7-5590-4e7b-a8d6-bc312eb7d38f.ogg';
  stateOptions: { label: string; value: string; }[];
  source = new EventSource(this.zithApiService.getStreamMessagesURL);
  eventlisten: void;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  displayRefundDialog: boolean;
  showRefunddialogdata: boolean;
  transactionid: string;
  merchantIdForOtp: any;

  constructor(private formbuilder: FormBuilder, private router: Router,
    private toastr: MessageService,
    private route: ActivatedRoute,
    private zithApiService: ZithapiService,
    private roleService: RoleService,
    private primengConfig: PrimeNGConfig,
    private ngxHowlerService: NgxHowlerService,
    private breakpointObserver: BreakpointObserver) {
    this.ngxHowlerService.loadScript('https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.0/howler.min.js');
    this.stateOptions = [{label: 'Off', value: 'off'}, {label: 'On', value: 'on'}];


  }
  ngOnDestroy(): void {
    try {
      this.disconnect()
    } catch {

    }

  }

  showDialog() {
    this.display = true;
}

hideDialog(){
  this.dialogdata = {}
  this.showdialogdata = false
}
showDialogRefund(id) {
  console.log(id);
  // this.merchantIdForOtp = id;
  this.initiateRefund(id)
  this.displayRefundDialog = true;
}

hideDialogRefund(){
this.dialogdata = {}
this.showRefunddialogdata = false
}
checkCountdown(e: CountdownEvent) {
  if(e.action === 'done'){
    this.otpMessage = "OTP expired"
    this.disableResend = false
  }
}
resend(){
  this.countdown.restart()
  this.initiateRefund(this.transactionid)
}

validate(){
  console.log(this.inputOTP.toString().length)
  if(this.inputOTP.toString().toString().length !== 6){
    this.showError("Incorrect OTP")
    return
  }

  this.zithApiService.validateRefundOTP(this.transactionid,this.inputOTP).subscribe((data:string) => {
    if(data.toLowerCase().includes('refund initiated')){
      this.router.navigate(['refunds']);
      this.showSuccess(data)

    } else {
      this.showError(data)
    }
  })
}

  ngOnInit(): void {

    this.initMerchant()
    // this.initstart.setDate(this.insitstart.getDate() - 1)
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


        this.changeVoiceTransaction({checked : false})



  }

  initMerchant(){
    this.zithApiService.getUserRolesKC().subscribe((data:Array<String>) => {
      if(data.includes(Role.SuperUser)){

        this.getAllParMerchants();

        this.cols = [

          { field: 'custname', header: 'Recieved From ' },
          { field: 'utrid', header: 'UTR ID ' },
          { field: 'zitharavpa', header: 'VPA ' },
          { field: 'createdate', header: 'Date & Time ' },
          { field: 'amount', header: 'Amount ' },
          { field: 'zicoins', header: 'Zicoins ' },
          { field: 'phone', header: 'Phone ' },
          { field: 'settled', header: 'Status ' },
      ];
      this.colarray = this.cols.map(col => col.header);
      this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

      } else if(data.includes(Role.Admin)){
        this.cols = [

          { field: 'custname', header: 'Recieved From ' },
          { field: 'utrid', header: 'UTR ID ' },
          { field: 'zitharavpa', header: 'VPA ' },
          { field: 'createdate', header: 'Date & Time ' },
          { field: 'amount', header: 'Amount ' },
          { field: 'zicoins', header: 'Zicoins ' },
          { field: 'phone', header: 'Phone ' },
          { field: 'settled', header: 'Status ' }
      ];
      this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
        this.getAllSubMerchants()


      } else if(data.includes(Role.Shop)) {

        this.cols = [

          { field: 'custname', header: 'Recieved From ' },
          { field: 'utrid', header: 'UTR ID ' },
          { field: 'zitharavpa', header: 'VPA ' },
          { field: 'createdate', header: 'Date & Time ' },
          { field: 'amount', header: 'Amount ' },
          { field: 'zicoins', header: 'Zicoins ' },
          { field: 'phone', header: 'Phone ' }
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

          this.zithApiService.getTerminalIDs(submerchantids,false).subscribe(res => {
          // console.log(res,'---TERMINALS---')
          this.terminalsData = res.data
          this.selectedTerminals = res.data
          this.getTransactions(undefined);

      })


        }  )

    } else {

      this.roleService.getPrimeid().then(val => {
        console.log(val)
        this.selectedSubMerchants = undefined
        this.zithApiService.getTerminalIdByGroupId(val).subscribe({
          next:data => {
            this.selectedTerminals = [{
              name: 'aa',
              id: data
            }];

            this.getTransactions(undefined);

          },
          error:Error => {
            this.showError('Some error occured')
          }
        })




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
    this.zithApiService.getPrimaryMerchants()
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.merchantsData = data.body.data;
      this.selectedMerchants = this.merchantsData[0].id;
      console.log(this.selectedMerchants[0].id);
      console.log('selected---->',this.selectedMerchants)
      this.getSubMerchantsByParents(this.merchantsData[0].id)
      console.log('all merchants---->',this.merchantsData);
    }, error => {

    });
  }

  getAllSubMerchants(): void {
    this.zithApiService.getSubMerchants()
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.subMerchantsData = data.body.data;
      this.selectedSubMerchants = data.body.data;
      var submerchantids = Array.from(data.body.data).map(obj => obj['id'])
      this.zithApiService.getTerminalIDs(submerchantids,false).subscribe(res => {
        console.log(res,'---TERMINALS---')
        this.terminalsData = res.data
        this.selectedTerminals = res.data
        this.getTransactions(undefined);
      })

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
    if(this.roleService.hasRoleV2([Role.Admin])){
      console.log(selectedMerchant[0].id);
      this.zithApiService.getSubmerchantsByParentId(selectedMerchant)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(data => {
        this.subMerchantsData = data.body.data;
        this.selectedSubMerchants = data.body.data;
        var submerchantids = Array.from(data.body.data).map(obj => obj['id'])
      this.zithApiService.getTerminalIDs(submerchantids,false).subscribe(res => {
        // console.log(res,'---TERMINALS---')
        this.terminalsData = res.data
        this.selectedTerminals = res.data
        // Array.from(res.data).map(obj => obj['id'])
        // console.log(this.selectedTerminals,'---TERMINALS---')
        this.getTransactions( undefined);
      })
        // this.getTransactions(undefined);
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
    // console.log(terminalids,'---TERMINALS TRANS---',this.selectedTerminals)
    var terminalids;
    try {
      terminalids = Array.from(this.selectedTerminals).map(obj => obj['id'])
    } catch (error) {
      terminalids = []
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

      this.zithApiService.getTransactions(startDate, endDate, this.pageSize, Math.max(0,this.page-1) , terminalids)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(data => {
        // console.log(data);
        this.showfirst = true
        this.showtable = true
        this.transactionsData = data.pages.content;
        this.totaltrans = data.grandtotal
        this.countRefunds(this.transactionsData)

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

    if(!(value.className.includes('p-multiselect'))){
      this.selterminals.hide()
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

    try {
      this.selterminals.overlayVisible = false
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

  onClickTerminals(elem){
    if(this.smallscreen){
      elem.hide()
      this.visibleTerminals=true
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
    var terminalids;
    try {
      terminalids = Array.from(this.selectedTerminals).map(obj => obj['id'])
    } catch (error) {
      terminalids = []
    }
    const startDate = this.formatDate(this.fromDate);
    const endDate = this.formatDate(this.toDate);
  return  this.zithApiService.getTransactions(startDate, endDate, this.transactionsDataCount, 0, terminalids)
    // tslint:disable-next-line: no-shadowed-variable

  }

  exportPdf() {
    this.getAlltransactions().subscribe(data => {
      console.log(data);
      this.pdftransactionsData = data.pages.content;
      const doc:jsPDF = new jsPDF();
      this.pdftransactionsData.forEach(element => {
        if(element.settled){
          element.settled = 'settled'
        } else {
          element.settled = 'not settled'
        }
      });

    this.pdftransactionsData.forEach(function(x){delete x.id;delete x.vpa_source});

      autoTable(doc,{columns: this.exportColumns,body: this.pdftransactionsData});
      doc.save('zitransactions.pdf');
      this.loading = false;

    }, error => {

    });



}

exportExcel() {

  this.getAlltransactions().subscribe(data => {
    // console.log(data);
    this.xlalltransactionsData = data.pages.content;

    this.xlalltransactionsData.forEach(function(x){delete x.id});
    let headers = {

      'merchant_name': 'Store Name ',
      'custname':'Recieved From ' ,
      'utrid':'UTR ID ' ,
      'zitharavpa':'VPA ' ,
      'createdate':'Date & Time ' ,
      'amount':'Amount ' ,
      'zicoins':'Zicoins ' ,
      'settled':'Status ',
      'phone':'Phone ',
      'vpa_source':'Source '
    };

   this.xlalltransactionsData.unshift(headers)

  //  console.log('all trans', this.xlalltransactionsData)


    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.xlalltransactionsData,{skipHeader: true});
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "zitransactions");
  });
    this.loading = false;

  }, error => {

  });


}

saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
}

statusConverter(status: string): string{
  if(status.includes('refunded')){
    return 'Refunded'
  } else if (status.includes('unsettled')){
    return 'Not-Settled'
  } else if (status.includes('refund-initiated') || status.includes('refund_initiated') ){
    return 'Refund Initiated'
  } else if (status.includes('settled')) {
    return 'Settled'
  }

  return '';
}

refundSwitch(status: string): boolean{
  if (status.includes('unsettled')){
    return false
  } else {
    return true
  }
}

showSuccess(message) {
  // this.toastr.success(message);
  this.toastr.add({key: 'myKey1', severity:'success', summary: 'Success', detail: message});
}

showError(message) {
  // this.toastr.error(message);
  this.toastr.add({key: 'myKey1', severity:'error', summary: 'Error', detail: message});
}



countRefunds(trans){

  this.refundcount = (trans.filter(o => o['status'].includes('refund'))).length



}

initiateRefund(transactionid:string){
  this.zithApiService.initiateRefundOTP(transactionid).subscribe(
    data => {
      if(data.toString().toLowerCase().includes("otp sent")){
        this.showSuccess(data);
        this.otpMessage = data
        this.countdown.begin()
        this.disableResend = true
      } else {
        this.showError(data);
      }
  },
  error => {

  })

}

getTerminals(){
  var submerchantids = Array.from(this.selectedSubMerchants).map(obj => obj['id'])
  this.zithApiService.getTerminalIDs(submerchantids,false).subscribe(res => {
    // console.log(res,'---TERMINALS---')
    this.terminalsData = res.data
    this.selectedTerminals = res.data
    // Array.from(res.data).map(obj => obj['id'])
    // console.log(this.selectedTerminals,'---TERMINALS---')
    this.getTransactions( undefined);
  })

}

loadbyUTRId(searchterm:string){

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
  console.log(startDate, endDate);
  var terminalids;
    try {
      terminalids = Array.from(this.selectedTerminals).map(obj => obj['id'])
    } catch (error) {
      terminalids = []
    }

  if(subMerchantsId !== undefined){

    this.zithApiService.searchUTR(searchterm, terminalids)
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      console.log('sd',data.name);
      if(data.name === undefined){
        this.dialogtitle = "No transaction found"
        this.dialogdata = {}
        this.showdialogdata = false
      } else {
        this.dialogtitle = ""
        this.dialogdata = data
        this.showdialogdata = true
      }
      this.showDialog();

      // this.transactionsData = data.pages.content;
      // this.totaltrans = data.grandtotal
      // this.countRefunds(this.transactionsData)

      // this.transactionsDataCount = data.pages.total;
      // console.log(this.transactionsData);
    }, error => {

    });
  }
}

changeVoiceTransaction(event:any){
  // console.log(event)
  var opt = event['checked']

  if(opt){
    this.connect()
  } else {
    this.disconnect()
  }

}

onCatchTranscation(message){

}

connect(): void {

  var id :string = '';
  this.zithApiService.getGroupIdKC().toPromise().then(data => {
    console.log('groupid',data);
    id = data

  this.source = new EventSource(this.zithApiService.getStreamMessagesURL);

  console.log('connecting to ' + this.zithApiService.getStreamMessagesURL)
  this.eventlisten= this.source.addEventListener('message', message => {
      let n: any; //need to have this Notification model class in angular2
      n = JSON.parse(message.data);
      if(n.id === id){
        this.ngxHowlerService.register('dev', {
          src: ['https://transaction-audio.s3.ap-south-1.amazonaws.com/test/'+ n['filename']],
          html5: true
        }).subscribe(status => {
          // ok
          // console.log('done registry')
          this.ngxHowlerService.get('dev').play();
        });

      }

  });

  } )


}

disconnect() : void {
  if(this.source.OPEN === 1){
    this.source.removeEventListener('message',message => {},)
    this.source.close()
    this.source = null
  }

}


}
