import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Role } from '../../model/roles';
import { RoleService } from '../../services/role.service';
import { ZithapiService } from '../../shared/services/zithapi.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit,AfterViewInit {

  public subMerchantsData: any = [];
  public selectedSubMerchants = {
    name : '',
    id : ''
  };
  public merchantsData: any = [];
  public selectedMerchants  = {
    name : '',
    id : ''
  };
  showfirst = false
  selectedTerminals: any;
  terminalsData: any;
  visibleTerminals: boolean;
  public Role = Role;
  items: MenuItem[];
  chosenTab : MenuItem
  chosenLabel : string

  @ViewChild('notification') notification;
  @ViewChild('ziconfig') ziconfig;

  constructor(
    private toastr: MessageService,
    private zithApiService: ZithapiService,
    private roleService: RoleService,
    // private primengConfig: PrimeNGConfig,
    private router : Router
  ) { }

  ngOnInit(): void {
    // this.primengConfig.ripple = true

    this.items = [
      {label: 'Configure Notifications', icon: 'pi pi-fw pi-bell'},
      {label: 'Configure ZiCoins', icon: 'pi pi-fw pi-star'},
      {label: 'Configure Feedback', icon: 'pi pi-fw pi-users'}
  ];
    this.chosenTab = this.items[0]
    this.chosenLabel = this.items[0].label

    this.initMerchant()
  }

  ngAfterViewInit(): void {
      this.showfirst = true
  }

  activateMenu(event){
    this.chosenLabel = event.activeItem.label
    this.getTransactions(undefined)
  }

  initMerchant(){
    this.zithApiService.getUserRolesKC().subscribe((data:Array<String>) => {
      if(data.includes(Role.SuperUser) ){

        // this.getAllParMerchants();


      }  else if(data.includes(Role.Admin)) {

        this.roleService.getPrimeid().then(val => {

          // this.selectedSubMerchants = []
          this.selectedMerchants = {
            name: '',
            id: val
          };

          this.getSubMerchantsByParents(this.selectedMerchants.id)



      //     var submerchantids = Array.from(this.selectedSubMerchants).map(obj => obj['id'])

      //     this.zithApiService.getTerminalIDs(submerchantids,false).subscribe(res => {
      //     this.terminalsData = res.data
      //     this.selectedTerminals = res.data
      //     // this.getTransactions(undefined)
      // })


        }
        )

    } else {

    this.router.navigateByUrl('/')
    }


  }, error => {

    });
   }

   getSubMerchantsByParents(selectedMerchant): void{
    if(this.roleService.hasRoleV2([Role.Admin])){
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
        this.getTransactions(undefined);
        console.log(this.selectedMerchants.name,this.selectedSubMerchants.name,this.selectedTerminals)
      })
        // this.getTransactions(undefined);
        // console.log(this.subMerchantsData);
      }, error => {

      });
    } else {
      this.getTransactions(undefined);

    }

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

  changeStore(){
    this.zithApiService.getTerminalIDs([this.selectedSubMerchants.id],false).subscribe(
      res => {
        console.log(res,'---TERMINALS---')
        this.terminalsData = res.data
        this.selectedTerminals = res.data
        this.getTransactions( undefined);
      }, error => {

      }
      )

  }

  filterMerchant(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    console.log(event.query)
    if(event.query===''){
      return
    }

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

  getTransactions(val){
    if(this.chosenLabel  === 'Configure Notifications'){
      this.notification.getTransactions(undefined)
    }

    if(this.chosenLabel  === 'Configure ZiCoins'){

    }


  }

  onSelectSearchedMerchant(){

    this.getSubMerchantsByParents(this.selectedMerchants.id)
  }

}
