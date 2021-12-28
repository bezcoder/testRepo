import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ZithapiService } from '../../shared/services/zithapi.service';
import {UtilitiesService} from '../../shared/services/utilities.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PrimeNGConfig } from 'primeng/api';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RoleService } from '../../services/role.service';
import { Role } from '../../model/roles';

interface Document {
  documentMode?: any;
}

interface Navigator {
  msSaveOrOpenBlob: (blob: Blob) => void
}

@Component({
  selector: 'app-merchantqr',
  templateUrl: './merchantqr.component.html',
  styleUrls: ['./merchantqr.component.scss']
})
export class MerchantqrComponent implements OnInit {

  @ViewChild('selmerchant') selmerchant;
  @ViewChild('selsubmerchant') selsubmerchant;
  @ViewChild('selterminals') selterminals;
  public sidebaron: any;
  public subMerchantsData: any;
  public subMerchants: any;
  public visible: boolean;
  public subMercQRCode: any;
  public selectedSubMerc: any;
  smallscreen: boolean;
  showtable: boolean = false;
  capturedImage;
  @ViewChild('QRCODECONTAINER') QRCODECONTAINER: ElementRef;
  subMercNameForQR: any;
  subMercQRCodeUnsafe: any;
  qrExist = false;
  selectedSubMerchants: any;
  public Role = Role;
  terminalsData: any;
  selectedTerminal: string;
  merchantsData: any;
  selectedMerchants: any;
  visibleSidebar4: boolean;
  sidebarheader: string;
  visibleStore: boolean;
  visibleTerminals: boolean;
  showfirst = false;

  constructor(private router: Router,
              private toastr: ToastrService,
              private zithApiService: ZithapiService,
              public utilities: UtilitiesService,
              private sanitizer:DomSanitizer,
              private roleService: RoleService,
              private primengConfig: PrimeNGConfig,
              private breakpointObserver: BreakpointObserver
  ) { }

 async ngOnInit() {

    // if(await this.roleService.hasRoleV2([Role.SuperUser, Role.Admin])){
    //   console.log('passed')
    //   // this.getAllSubMerchants();
    // } else {
      this.initMerchant()
    // this.router.navigateByUrl('/')
    // }

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

  getAllSubMerchants(): void {
    this.zithApiService.getSubMerchants()
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.subMerchantsData = data.body.data;
      this.selectedSubMerc = data.body.data[0].id;
      var submerchantids = Array.from(data.body.data).map(obj => obj['id'])
      this.zithApiService.getTerminalIDs(submerchantids,false).subscribe(res => {
        // console.log(res,'---TERMINALS---')
        this.terminalsData = res.data
        this.selectedTerminal = res.data[0].id
        this.getQRCodeForSubMerc();
      })

      console.log(this.subMerchantsData);
    }, error => {

    });
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

  getSubMerchantsByParents(selectedMerchant): void{
    if(this.roleService.hasRoleV2([Role.Admin])){
      console.log(selectedMerchant[0].id);
      this.zithApiService.getSubmerchantsByParentId(selectedMerchant)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(data => {
        this.subMerchantsData = data.body.data;

        var submerchantids = Array.from(data.body.data).map(obj => obj['id'])
        this.selectedSubMerchants = submerchantids;
      this.zithApiService.getTerminalIDs(submerchantids,false).subscribe(res => {
        // console.log(res,'---TERMINALS---')
        this.terminalsData = res.data
        this.selectedTerminal = res.data[0].id
        this.getQRCodeForSubMerc();
        // Array.from(res.data).map(obj => obj['id'])
        // console.log(this.selectedTerminals,'---TERMINALS---')
        // this.getTransactions( undefined);

      })
        // this.getTransactions(undefined);
        console.log(this.subMerchantsData);
      }, error => {

      });
    } else {
      // this.getTransactions(undefined);


    }

  }

  initMerchant(){
    this.zithApiService.getUserRolesKC().subscribe((data:Array<String>) => {
      if(data.includes(Role.SuperUser)){

        this.getAllParMerchants();


      } else if(data.includes(Role.Admin)){


        this.getAllSubMerchants()


      } else if(data.includes(Role.Shop)) {

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
          this.selectedTerminal = res.data[0].id
          this.getQRCodeForSubMerc();
          // this.getTransactions(undefined);
      })


        }  )

    } else {

      this.roleService.getPrimeid().then(val => {
        console.log(val)
        this.selectedSubMerchants = undefined
        this.selectedTerminal = val
        // this.getTransactions(undefined
        this.getQRCodeForSubMerc();



      }  )
    }


  }, error => {

    });
   }


  getQRCodeForSubMerc(): void {

    // console.log(this.selectedSubMerc);

    this.zithApiService.getQrCode(this.selectedTerminal)
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      // this.subMercQRCode = this.sanitizer.bypassSecurityTrustUrl(data.qr);
      if(this.isEmptyObject(data.qr)){
        this.qrExist = false;
        // console.log("fgfgfg")
        this.showfirst = true
      } else {
        this.qrExist = true;
        this.subMercQRCode =  data;
        this.showfirst = true
        // console.log("asasrere")

      }

      // this.subMercNameForQR = data.merchantName;
      // console.log(data);
    }, error => {
    });
  }

  getTerminals(){
    var submerchantids = Array.from(this.selectedSubMerchants).map(obj => obj['id'])
    this.zithApiService.getTerminalIDs(submerchantids,false).subscribe(res => {
      // console.log(res,'---TERMINALS---')
      this.terminalsData = res.data
      this.selectedTerminal = res.data[0].id

    })

  }

  isEmptyObject(obj: {}) {
    return (obj && (Object.keys(obj).length === 0));
  }

  createQRCodeForSubMerc(submerchantId: any): void {
    console.log(submerchantId);
    this.zithApiService.createQrCode(submerchantId)
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.subMercQRCode = data.qr;
      this.subMercNameForQR = data.merchantName;
      this.printPage(this.subMercQRCode)
      // console.log(data);
    }, error => {
    });
  }

  printPage(subMercQRCode): any {
    const myImage = subMercQRCode.qr;
    const myWindow = window.open('', 'QRCODE');
    myWindow.document.write('<img src=\'' + myImage + '\'\'>');
    myWindow.print();
    myWindow.close();
  }
  downLoadQR(subMercQRCode) {
    const x = this.utilities.searchInArrayOfObject(this.selectedTerminal, this.terminalsData);
    console.log(x);
    // console.log(this.QRCODECONTAINER.nativeElement.querySelector("img"));
    // const parentElement = this.QRCODECONTAINER.nativeElement.querySelector("img").src;



    const blobData = this.convertBase64ToBlob(this.subMercQRCode.qr);

    if (window.navigator && window.navigator['msSaveOrOpenBlob']) { //IE
      window.navigator['msSaveOrOpenBlob'](blobData, 'Qrcode');
    } else { // chrome
      const blob = new Blob([blobData], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = x.terminal_name;
      link.click();
    }
  }
  private convertBase64ToBlob(Base64Image: any) {
    const parts = Base64Image.split(';base64,');
    const imageType = parts[0].split(':')[1];
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: imageType });
  }

  // async initMerchant(){
  //   if(await this.roleService.hasRoleV2([Role.Admin])){
  //      this.getAllSubMerchants()
  //   } else {
  //     this.roleService.getPrimeid().then(val => {
  //       console.log(val)
  //       this.subMerchantsData = [{
  //         name: 'aa',
  //         id: val
  //       }];
  //       this.selectedSubMerc = this.subMerchantsData[0].id;
  //     this.getQRCodeForSubMerc(val);
  //     }  )
  //   }
    //
  // }

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

  @HostListener('click',["$event.target"])
  onClick(value) {
    try {
      if(!(value.className.includes('p-dropdown'))){
        this.selmerchant.hide()

    }

    if(!(value.className.includes('p-dropdown'))){
      this.selsubmerchant.hide()
    }

    if(!(value.className.includes('p-dropdown'))){
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

    }
//     if(this.dtrange.overlayVisible){
// this.dtrange.overlayVisible = false;
//     }
  } catch {
  let a = 1
}


  }





}
