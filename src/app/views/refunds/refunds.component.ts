import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig, LazyLoadEvent, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Role } from '../../model/roles';
import { RoleService } from '../../services/role.service';
import { ZithapiService } from '../../shared/services/zithapi.service';

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.scss']
})
export class RefundsComponent implements OnInit {

  form: FormGroup;
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

  transaction_img  = {
    "bob" : "../../../assets/images/upi_logo/bob.png",
    "rbl" : "../../../assets/images/upi_logo/rbl.png",
    "bhim" : "../../../assets/images/upi_logo/bhim.jpg",
    "allb" : "../../../assets/images/upi_logo/allbank.png",
    "au" : "../../../assets/images/upi_logo/aubank.jpg",
    "axis" : "../../../assets/images/upi_logo/axis.png",
    "bandhan" : "../../../assets/images/upi_logo/bandhan.png",
    "indus" : "../../../assets/images/upi_logo/indus.png",
    "kbl" : "../../../assets/images/upi_logo/kbl.png",
    "fed" : "../../../assets/images/upi_logo/fedral.jpg",
    "sbi" : "../../../assets/images/upi_logo/sbi.png",
    "citi" : "../../../assets/images/upi_logo/citi.png",
    "digi" : "../../../assets/images/upi_logo/dbs.jpg",
    "fc" : "../../../assets/images/upi_logo/fc.png",
    "gpay" : "../../../assets/images/upi_logo/gpay.png",
    "hsbc" : "../../../assets/images/upi_logo/hsbc.jpg",
    "icici" : "../../../assets/images/upi_logo/icici.jpg",
    "kotak" : "../../../assets/images/upi_logo/kotak.jpg",
    "paytm" : "../../../assets/images/upi_logo/paytm.png",
    "phonepe" : "../../../assets/images/upi_logo/phonepe.jpg",
    "sib_mirror" : "../../../assets/images/upi_logo/sib.jpg",
    "yesbank" : "../../../assets/images/upi_logo/yes.png",
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
  terminalsData: any;
  selectedTerminals: any;
  visibleTerminals: boolean;
  showrefundtable: boolean = false;
  showfirst : boolean = false;
  toDate : Date = new Date();
  fromDate : Date = new Date();

  constructor(private formbuilder: FormBuilder, private router: Router,
    private toastr: MessageService,
    private zithApiService: ZithapiService,
    private roleService: RoleService,
    private primengConfig: PrimeNGConfig,
    private breakpointObserver: BreakpointObserver) {

  }

  ngOnInit(): void {

    this.initMerchant()
    // this.initstart.setDate(this.initstart.getDate() - 1)
    // this.source$.subscribe();
    this.form = this.formbuilder.group({
      eventName: new FormControl('transactionsdatepicker'),
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

        this.cols = [

          { field: 'custname', header: 'Recieved From ' },
          { field: 'utrid', header: 'Refund UTR ID ' },
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
          { field: 'utrid', header: 'Refund UTR ID ' },
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
          { field: 'utrid', header: 'Refund UTR ID ' },
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
        this.getTransactions( undefined);
      })

      console.log(this.subMerchantsData);
    }, error => {

    });
  }

  stripName(str: string): string{
    if(str.length > 20){
      str = str.substr(16) + '...'
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
    console.log(startDate, endDate);

    if(subMerchantsId !== undefined){

      this.zithApiService.getRefunds(startDate, endDate, this.pageSize, Math.max(0,this.page-1) , terminalids)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(data => {
        console.log(data);
        this.transactionsData = data.pages.content;
        this.transactionsDataCount = data.pages.total;
        this.totaltrans = data.grandtotal;

        if(!this.showrefundtable){
          this.showrefundtable = true
        }

        if(data.pages.total === 0){
          this.disableDownload = true
        } else {
          this.disableDownload = false
        }
        this.loading = false;
        this.showfirst = true;

      }, error => {

      });
    }
    }
  // getTransactions(event:LazyLoadEvent) {
  //   console.log(event)
  //   this.loading = true;
  //   if(event!==undefined){
  //     this.page = Math.round(event.first/event.rows)+1
  //     this.pageSize = event.rows
  //   }

  //   console.log('selected',this.selectedSubMerchants);
  //   const subMerchantsId = [];
  //   if(this.selectedSubMerchants!==undefined){
  //     this.selectedSubMerchants.forEach(element => {
  //       subMerchantsId.push(element.id);
  //     });
  //   }

  //   console.log(subMerchantsId);
  //   console.log(this.form.get('dateRange'));
  //   console.log(this.dateRangenew[0]);
  //   console.log(this.dateRangenew[1]);
  //   console.log(subMerchantsId);
  //   if(this.dateRangenew[1] === null || this.dateRangenew[1] === undefined ){
  //     this.dateRangenew[1] = this.dateRangenew[0]
  //   }
  //   const startDate = this.formatDate(this.dateRangenew[0]);
  //   const endDate = this.formatDate(this.dateRangenew[1]);
  //   console.log(startDate, endDate);

  //   if(subMerchantsId !== undefined){

  //     this.zithApiService.getRefunds(startDate, endDate, this.pageSize, this.page-1, subMerchantsId)
  //     // tslint:disable-next-line: no-shadowed-variable
  //     .subscribe(data => {
  //       console.log(data);
  //       this.transactionsData = data.pages.content;

  //       this.transactionsDataCount = data.pages.total;
  //       if(data.pages.total === 0){
  //         this.disableDownload = true
  //       } else {
  //         this.disableDownload = false
  //       }
  //       this.loading = false;
  //       // console.log(this.transactionsData);
  //     }, error => {

  //     });
  //   }
  //   }

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
    } catch (error) {

    }

    try {
      if(!(value.className.includes('p-multiselect'))){
        this.selsubmerchant.hide()
      }
    } catch (error) {

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

  showSuccess(message) {
    // this.toastr.success(message);
    this.toastr.add({key: 'myKey1', severity:'success', summary: 'Success', detail: message});
  }

  showError(message) {
    // this.toastr.error(message);
    this.toastr.add({key: 'myKey1', severity:'error', summary: 'Error', detail: message});
  }

  closedt(dtrange){
    dtrange.hideOverlay()
    console.log(this.form.get('dateRange').value)
    const startDate = this.formatDate(this.form.get('dateRange').value[0]);
    const endDate = this.formatDate(this.form.get('dateRange').value[1]);
    console.log(startDate,endDate)
  }

  disableoveralay(){
    console.log('hideoverlay')

  this.dtrange.datepickerClick = true;

    // dtrange.hideOverlay()
  }

  showMerchatndrp(selmerchant){
    this.showmerdrp = 1
    this.dropmerelem = selmerchant
    console.log(this.showmerdrp)
  }

  onClickOutside() {
    console.log('1')
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

  onClickDateRange(elem){
    console.log('clicked')
    if(this.smallscreen){
      this.dtrange.toggle()
      this.visibleDateBar=true
    }
  }

  getAlltransactions(){
    this.loading=true
    const subMerchantsId = [];
    if(this.selectedSubMerchants!==undefined){
      this.selectedSubMerchants.forEach(element => {
        subMerchantsId.push(element.id);
      });
    }
    const startDate = this.formatDate(this.dateRangenew[0]);
    const endDate = this.formatDate(this.dateRangenew[1]);
  return  this.zithApiService.getTransactions(startDate, endDate, this.transactionsDataCount, 0, subMerchantsId)
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
      doc.save('zirefunds.pdf');
      this.loading = false;

    }, error => {

    });



}

exportExcel() {

  this.getAlltransactions().subscribe(data => {
    console.log(data);
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

   console.log('all trans', this.xlalltransactionsData)


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

// initiateRefund(transactionid:string){
//   console.log("pressed")
//   this.displayOTP = trSue
// }

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

onClickTerminals(elem){
  if(this.smallscreen){
    elem.hide()
    this.visibleTerminals=true
  }
}

splitTransId(str:string){

  if(str.includes('|')){
    return str.split('|')[1]
  } else {
    return str
  }
}


}
