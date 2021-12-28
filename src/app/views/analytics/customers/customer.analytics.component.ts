import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { CurrencyPipe } from '@angular/common';

import { Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../model/roles';
import { ZithapiService } from '../../../shared/services/zithapi.service';
import { Subscription } from 'rxjs';
import { AppConfig, AppConfigService } from '../../../services/appconfig.service';
import { BreakpointObserver } from '@angular/cdk/layout';
declare var require: any;

const primary = localStorage.getItem('primary_color') || '#4466f2';
const secondary = localStorage.getItem('secondary_color') || '#1ea6ec';
export var dailyChartLabels: string[] = ['New', 'Repeated', 'All'];

@Component({
  selector: 'app-dashboard',
  templateUrl: './customer.analytics.component.html',
  styleUrls: ['./customer.analytics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerAnalyticsComponent implements OnInit {
  showskel1: boolean = true;
  showskel2: boolean = true;



  @ViewChild('selsubmerchant') selsubmerchant;
  yesterdaySale: number;
  changeOfSale:string;
  newCustomers: any;
  repeatedCustomers: any;
  totalCustomers: any;
  currentMonthSales: any;
  previousMonthSales: any;
  currentMonthVisits: any;
  previousMonthVisits: any;
  todayVisits: any;
  yesterdayVisits: any;
  todaySale: number;
  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  public todaydate = new Date();
  month = this.todaydate.getMonth();
  year = this.todaydate.getFullYear();
  public currentMonth = this.months[this.month] +" "+ this.year;
  public pieChartColor:any = [
    {
        backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)'
        ]
    }
]
public pieChartLabels = ['This Month', 'Last Month'];
public pieChartOptions = {
  responsive: true
}
public pieChartData:any = [
  {
      data: []
  }
];
public daySalesPieChartColor:any = [
  {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
      'rgba(255,165,0,0.9)'
      ]
  }
]
public daySalesPieChartLabels = ['Today', 'Yesterday'];
public daySalesPieChartOptions = {
responsive: true
}
public daySalesPieChartData:any = [
{
    data: []
}
];
  changeOfVisits: string;
  changeOfSaleMonth: string;
  changeOfVisitsMonth: string;
  showtotalsales: boolean;
  showtotalsalesMonth: boolean;
  new_data: { name: string; value: any; }[];
  rfmM: any;
  rfmF: any;
  new_repeat_options:EChartsOption;
  rfmChartOptionsF: EChartsOption ;
  rfmChartOptionsM:EChartsOption;
  rfmChartOptionsR:EChartsOption
  nearbyCustChartOptions:EChartsOption;
  rfmSegmentsChartOptions:EChartsOption;
  distance: number = 25;
  subcat: boolean = true;
  showNearbyCustomerLoading: boolean = false;
  nearby_customer_data: any;
  rfmR: any;
  smallscreen: boolean;
  showRFMSegmentsLoading: boolean = false;
  rfm_segments_data: any;
  constructor(private zithApiService: ZithapiService,
              public currencyPipe: CurrencyPipe,
              public router : Router,
              public breakpointObserver : BreakpointObserver,
              public roleService : RoleService) {


                this.breakpointObserver.observe([
                  '(max-width: 960px)'
                    ]).subscribe(result => {
                      if (result.matches) {
                        this.smallscreen = true
                        this.setChartOptions('weekdayFFday',[8])
                      } else {
                        // if necessary:
                        this.smallscreen = false
                        this.setChartOptions('weekdayFFday',[12])

                      }
                    });

               }

  public subMerchantsData: any;
  public selectedSubMerchants: any;
  public merchantsData: any;
  public selectedMerchants: any;

  public metricToday = 'sum'
  public modeToday = 'weekdays'

  public metricMonth = 'sum'
  public modeMonth = 'months'

  public metricWeekday = 'sum'
  public salesHeader = 'Total Sales'

  public salesHeaderMonth = 'Total Sales'
  date: { year: number, month: number };
  public intmin: any;
  public intsec: any;
  public inthour: any;
  public time: Date = new Date();
  public jstoday = '';
  today: number = Date.now();
  public dailyChartLabels: any;
  public dailyChartData: any;
  public dailyChartColors: any;
  public dailyChartType: any;
  public dailyChartLegend: any;
  public dailyChartOptions: any;
  public Role = Role;


getLightTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    }
}

getDarkTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        }
    }
}


  // new_repeat_options: EChartsOption = {
  //   legend: {
  //     orient: 'vertical',
  //     top: 'left',
  //     data: ['New', 'Repeat'],
  //     textStyle:{
  //       fontSize: "0.6rem"
  //     }
  //   },
  //   series: [
  //     {
  //       type: 'pie',
  //       radius: ['50%', '70%'],
  //       avoidLabelOverlap: false,
  //       label: {
  //         show: false,
  //         position: 'center',
  //         fontSize: '0.7rem'


  //       },
  //       labelLine: {
  //         show: false
  //       },
  //       emphasis: {
  //         label: {
  //           show: true,
  //           fontSize: '0.7rem',
  //           fontWeight: 'bold',
  //           formatter: function (params) {

  //             return `${params.name}: ${params.data['value']} (${params.percent}%)
  //                      `;
  //           }
  //         },



  //       },
  //       data: [
  //         { value: 10, name: 'New' },
  //         { value: 20, name: 'Repeat' }
  //       ]
  //     }
  //   ]
  // };



  onChartClick(event) {
    console.log(event);

}

  setTime() {
    this.intmin = setInterval(function () {
      var second = new Date().getSeconds();
      var sdegree = second * 6;
      var srotate = "rotate(" + sdegree + "deg)";
      var seconds = document.getElementById('sec').style.transform = srotate;
    }, 1000);
    this.intsec = setInterval(function () {
      var mins = new Date().getMinutes();
      var mdegree = mins * 6;
      var mrotate = "rotate(" + mdegree + "deg)";
      var minits = document.getElementById('min').style.transform = mrotate;
    }, 1000);
    this.inthour = setInterval(function () {
      var hour = new Date().getHours();
      var mints = new Date().getMinutes();
      var hdegree = hour * 30 + (mints / 2);
      var hrotate = "rotate(" + hdegree + "deg)";
      var hours = document.getElementById('hour').style.transform = hrotate;
    }, 1000);
  }

 async ngOnInit() {

    if (!(await this.roleService.hasRole([Role.SuperUser,Role.Admin]))){

      this.router.navigate(['/transactions']);
      } else {

      }

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

      // this.zithApiService.getTotalSalesApi('weekdays','average',['0c78cd49-c5e0-45ea-8a25-2ee63e8cbc0a','0ae61d35-46a3-4c35-9eae-c0ddc07d8502'])
      // .subscribe(data => {
      //   console.log('dashboard data')
      //   console.log(data)

      // }, error => {

      // })

      this.initMerchant()

  }

  initMerchant(){
    this.zithApiService.getUserRolesKC().subscribe((data:Array<String>) => {
      if(data.includes(Role.SuperUser)){

        this.getAllParMerchants();

      } else if(data.includes(Role.Admin)){

        this.getAllSubMerchants()

      } else {

        this.roleService.getPrimeid().then(val => {
          // console.log(val)
          this.selectedSubMerchants = [{
            name: 'aa',
            id: val
          }];
          this.applyButton()
        }  )



    }}, error => {

    });
   }


  getAllSubMerchants(): void {
    this.zithApiService.getSubMerchants()
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.subMerchantsData = data.body.data;
      this.selectedSubMerchants = data.body.data;
      this.applyButton()
    }, error => {

    });
  }



  onGetData() {
    console.log("dfdfdfd");
  }

  closemulti(){
    this.selsubmerchant.overlayVisible = false
    // selsubmerchant.hideOverlay();

  }

  getAllParMerchants(): void{
    this.zithApiService.getPrimaryMerchants()
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.merchantsData = data.body.data;
      if(Array.from(data.body.data).length > 0){
        this.selectedMerchants = data.body.data[0].id ;
      }

      this.showskel1 = false

      // console.log(this.selectedMerchants,'-----selected merchants');
      if(Array.from(data.body.data).length > 0){
        this.getSubMerchantsByParents()
      }
    }, error => {

    });
  }



  getSubMerchantsByParents(): void{
    this.zithApiService.getSubmerchantsByParentId(this.selectedMerchants)
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.subMerchantsData = data.body.data;
      this.selectedSubMerchants = data.body.data;
      this.applyButton()
      // this.getDashboardData(this.selectedSubMerchants.map(o => o['id'] ))
      // this.getSettlements(this.page, this.pageSize, this.selectedSubMerchants);
      console.log(this.subMerchantsData);
    }, error => {

    });
  }


  applyButton() {
    // this.showskel1=true
    this.showskel2=true
    this.showtotalsales=false
    this.showtotalsalesMonth=false

    this.getNewCustomers(this.selectedSubMerchants.map(o => o['id'] ));
    // this.getRepeatCustomers(this.selectedSubMerchants.map(o => o['id'] ));
    this.getCustomerBase(this.selectedSubMerchants.map(o => o['id'] ));
    this.getRFMF(this.selectedSubMerchants.map(o => o['id'] ))
    this.getRFMM(this.selectedSubMerchants.map(o => o['id'] ))
    this.getRFMR(this.selectedSubMerchants.map(o => o['id'] ))
    this.getNearByCustomers(this.selectedSubMerchants.map(o => o['id'] ))
    this.getRFMSegments(this.selectedSubMerchants.map(o => o['id'] ))

  }

  setChartOptions(chartname:string, options?:Array<any>){

    switch ( chartname ) {
      case 'new_repeat':
        this.new_repeat_options  = {
          title : {
            show : this.totalCustomers===0,
            text : 'No Data Available',
            top : 'center',
            left : 'center'
          },
          legend: {
            orient: 'horizontal',
            top: 'left',
            data: ['New', 'Repeat'],
            textStyle:{
              fontSize: "0.6rem"
            }
          },
          series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
                fontSize: '0.7rem',
                fontWeight: 'bold',


              },
              labelLine: {
                show: false
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  formatter: function (params) {
                    return `${params.name}: ${params.data['value']} (${params.percent}%)
                             `;
                  }
                },



              },
              data: this.new_data
            }
          ]
        };
        break;

      case 'rfm_m':
        this.rfmChartOptionsM = {
          title : {
            show : options[0],
            text : 'No Data Available',
            top : 'center',
            left : 'center'
          },
          color : ['#2eb85c','#e55353','#f9b115'],
          legend: {
            orient: 'horizontal',
            show : true,
            top: 'left',
            data:  ['Low','Medium','High'],
            textStyle:{
              fontSize: "0.8rem"
            }
          },
          series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                fontSize: '0.8rem',
                fontWeight: 'bold',
                position : 'center',
                formatter: function (params) {
                  return  `(${params.percent}%)`;
                }
              },
              labelLine: {
                show: false
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  margin : 50,
                  padding : [-50, 0, 0, 0],
                  formatter: function (params) {
                    return  `${params.data['name']}: (${params.percent}%) \n\n  ${ params.data['name'] === 'High' ? 'Greater than ₹'+params.data['label'] : params.data['name'] === 'Low' ? 'Less than ₹'+params.data['label'] : 'Around ₹'+params.data['label']  }
                    `;
                  }
                },
              },
              data: this.rfmM
            }
          ]
        };
        break;

      case 'rfm_f':
          this.rfmChartOptionsF = {
            color : ['#2eb85c','#e55353','#f9b115'],
            title : {
              show : options[0],
              text : 'No Data Available',
              top : 'center',
              left : 'center'
            },
            legend: {
              orient: 'horizontal',
              top: 'left',
              show: true,
              data: ['Low','Medium' ,'High'],
              textStyle:{
                fontSize: "0.8rem"
              }
            },
            series: [
              {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: 'center',
                  fontSize: '0.7rem'
                },
                labelLine: {
                  show: false
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    formatter: function (params) {
                      return `${params.data['name']} (${params.percent}%)
                               `;
                    }
                  },



                },
                data:  this.rfmF
              }
            ]
          };
          break;

      case 'rfm_r':
        this.rfmChartOptionsR = {
          color : ['#2eb85c','#e55353','#f9b115'],
          title : {
            show : options[0],
            text : 'No Data Available',
            top : 'center',
            left : 'center'
          },
          legend: {
            orient: 'horizontal',
            top: 'left',
            show: true,
            data: ['Low','Medium' ,'High'],
            textStyle:{
              fontSize: "0.8rem"
            }
          },
          series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
                fontSize: '0.7rem'
              },
              labelLine: {
                show: false
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  formatter: function (params) {
                    return `${params.percent}% ${params.data['name']}
                             `;
                  }
                },



              },
              data:  this.rfmR
            }
          ]
        };
        break;
      case 'nearby_customers':
          this.nearbyCustChartOptions = {
            title : {
              show : options[0],
              text : 'No Data Available',
              top : 'center',
              left : 'center'
            },

            // title: {
            //   text: 'Disk Usage',
            //   left: 'center'
            // },

            tooltip: {
              formatter: function (params) {
                return `${params.name}: ${params.data['cnt']}`;
              }
            },
            graphic : this.nearby_customer_data.map(function (item, dataIndex) {
              return {
                type: 'circle',
                invisible: true,
                draggable: false,
              };
            }),

            series: [
              {
                // name: 'Nearby Customers',
                type: 'treemap',
                visibleMin: 10,
                emphasis : {
                  label : {
                    show: true,
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    formatter: function (params) {
                      return `${params.name}: ${params.data['cnt']}`;
                    }
                  }
                },
                height : 300,
                roam :'move',
                nodeClick : null,
                breadcrumb : null,
                label: {
                  show: true,
                  // formatter: '{b}'
                  formatter: function (params) {
                              return `${params.name}`;
                            }
                },
                itemStyle: {
                  borderColor: '#fff',
                },
                // levels: this.getLevelOption(),
                data: this.nearby_customer_data
              }
            ]
          }
          break;

      case 'rfm_segments':
          this.rfmSegmentsChartOptions = {
            title : {
              show : options[0],
              text : 'No Data Available',
              top : 'center',
              left : 'center'
            },

            // title: {
            //   text: 'Disk Usage',
            //   left: 'center'
            // },

            tooltip: {
              formatter: function (params) {
                return `${params.name}: ${params.data['cnt']}`;
              }
            },
            graphic : this.rfm_segments_data.map(function (item, dataIndex) {
              return {
                type: 'circle',
                invisible: true,
                draggable: false,
              };
            }),

            series: [
              {
                // name: 'Nearby Customers',
                type: 'treemap',
                visibleMin: 10,
                emphasis : {
                  label : {
                    show: true,
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    formatter: function (params) {
                      return `${params.name}: ${params.data['cnt']}`;
                    }
                  }
                },
                height : 300,
                roam :'move',
                nodeClick : null,
                breadcrumb : null,
                label: {
                  show: true,
                  // formatter: '{b}'
                  formatter: function (params) {
                              return `${params.name}`;
                            }
                },
                itemStyle: {
                  borderColor: '#fff',
                },
                // levels: this.getLevelOption(),
                data: this.rfm_segments_data
              }
            ]
          }
          break;
    }
  }



  // { value: 1, name: 'New' },
  // { value: 2, name: 'Repeat' }

  getLevelOption() {
    return [
      {
        itemStyle: {
          borderWidth: 0,
          gapWidth: 5
        }
      },
      {
        itemStyle: {
          gapWidth: 1
        }
      },
      {
        colorSaturation: [0.35, 0.5],
        itemStyle: {
          gapWidth: 1,
          borderColorSaturation: 0.6
        }
      }
    ];
  }

  getNewCustomers(submerchantids) {
    console.log(submerchantids);
    this.zithApiService.getNewCustomers(submerchantids)
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.newCustomers = data.result;

      this.zithApiService.getRepeatCustomers(submerchantids)
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.repeatedCustomers = data.result;

       this.new_data = [
        { name:'New', value : this.newCustomers},
        { name:'Repeat', value : this.repeatedCustomers}
      ]

      this.setChartOptions('new_repeat')



      this.showskel2 = false




    }, error => {

    });


    }, error => {

    });
  }
//
  // getRepeatCustomers(submerchantids) {
  //   console.log(submerchantids);
  //   this.zithApiService.getRepeatCustomers(submerchantids)
  //   // tslint:disable-next-line: no-shadowed-variable
  //   .subscribe(data => {
  //     this.repeatedCustomers = data.result;


  //   }, error => {

  //   });
  // }

  getCustomerBase(submerchantids) {
    console.log(submerchantids);
    this.zithApiService.getCustomerBase(submerchantids)
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.totalCustomers = data.result;
      console.log(data);
    }, error => {

    });
  }

  getRFMM(submerchantids){

    this.zithApiService.getRFMCenterM(submerchantids).subscribe({
      next: data => {

        this.rfmM = data['data']

        this.setChartOptions('rfm_m', [Array.from(this.rfmM).length === 0])

      },
      error:error => {

      }
    })
  }

  getRFMF(submerchantids){

    this.zithApiService.getRFMCenterF(submerchantids).subscribe({
      next: data => {

        this.rfmF = data['data']
        this.setChartOptions('rfm_f',[Array.from(this.rfmF).length === 0])

      },
      error:error => {

      }
    })
  }

  getRFMR(submerchantids){

    this.zithApiService.getRFMCenterR(submerchantids).subscribe({
      next: data => {
        this.rfmR = data['data']
        this.setChartOptions('rfm_r',[Array.from(this.rfmR).length === 0])
      },
      error:error => {

      }
    })
  }

  onChangeDistance(){
    this.showNearbyCustomerLoading = true
    this.getNearByCustomers(this.selectedSubMerchants.map(o => o['id'] ))
  }

  getNearByCustomers(submerchantids){

    this.zithApiService.getNearbyCustomers(submerchantids,this.distance,this.subcat).subscribe({
      next: data => {
        this.showNearbyCustomerLoading = false
        this.nearby_customer_data = data['data']

        // var arr = Array.from({length: Array.from(data['data']['xaxis']).length }, (_, i) => i + 1)
        // this.setChartOptions('nearby_customers',[arr,this.nearby_customer_data['yaxis']])
        this.setChartOptions('nearby_customers',[Array.from(this.nearby_customer_data).length === 0])
        // console.log(data['data']['xaxis'])

      },
      error:error => {
        this.showNearbyCustomerLoading = false
      }
    })
  }

  getRFMSegments(submerchantids){

    this.zithApiService.getRFMSegments(submerchantids).subscribe({
      next: data => {
        this.showRFMSegmentsLoading = false
        this.rfm_segments_data = data['data']

        // var arr = Array.from({length: Array.from(data['data']['xaxis']).length }, (_, i) => i + 1)
        // this.setChartOptions('nearby_customers',[arr,this.nearby_customer_data['yaxis']])
        this.setChartOptions('rfm_segments',[Array.from(this.rfm_segments_data).length === 0])
        // console.log(data['data']['xaxis'])

      },
      error:error => {
        this.showRFMSegmentsLoading = false
      }
    })
  }


  changeValueFormatter(latest,previous){
    var output = '';
    var change = ((((latest-previous)/previous)*100))
    if(!Number.isFinite(change)){
      output = ''
    } else if(change < 0 ){
      output = (change * -1).toFixed(2).toString() + '%'
    } else {
      output = (change).toFixed(2).toString() + '%'
    }

    return output

  }

}

