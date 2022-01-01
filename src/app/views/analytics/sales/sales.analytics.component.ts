import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { EChartsOption } from 'echarts';
import { CurrencyPipe, formatDate } from '@angular/common';

import { Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../model/roles';
import { ZithapiService } from '../../../shared/services/zithapi.service';
import { BreakpointObserver } from '@angular/cdk/layout';

export var dailyChartLabels: string[] = ['New', 'Repeated', 'All'];

export interface myChartInterface {
  xaxis : Array<any>,
  yaxis : Array<any>
}

export interface myChartInterfaceDoubleLine {
  xaxis : Array<any>,
  yaxis1 : Array<any>,
  yaxis2 : Array<any>
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './sales.analytics.component.html',
  styleUrls: ['./sales.analytics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SalesAnalyticsComponent implements OnInit {
  showskel1: boolean = true;
  showskel2: boolean = true;



  @ViewChild('selsubmerchant') selsubmerchant : ElementRef;

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
  smallscreen: boolean;
  weekDayFFDayOptions = [
    {
      name : 'Monday',
      value : 'Mon'
    },
    {
      name : 'Tuesday',
      value : 'Tue'
    },
    {
      name : 'Wednesday',
      value : 'Wed'
    },
    {
      name : 'Thursday',
      value : 'Thu'
    },
    {
      name : 'Friday',
      value : 'Fri'
    },
    {
      name : 'Saturday',
      value : 'Sat'
    },
    {
      name : 'Sunday',
      value : 'Sun'
    }

  ]
  weekDayFFDay:string = 'Sun'

  hourSalesData: myChartInterfaceDoubleLine;
  hourFFData: myChartInterfaceDoubleLine;
  monthSalesData: myChartInterfaceDoubleLine;
  monthFFData: myChartInterfaceDoubleLine;

  hourlyFFAnalyticsOption: EChartsOption;
  hourlySalesAnalyticsOption: EChartsOption;
  monthlySalesAnalyticsOption :EChartsOption
  monthlyFFAnalyticsOption :EChartsOption
  weekdayFFdayChartOption: EChartsOption

  fromDateFFDay : Date = new Date(new Date().setDate(new Date().getDate()-60));
  toDateFFDay : Date = new Date;
  ffData :Array<any> = [{
    name : '',
    value : ''
  }]
  closemultibool: boolean;
  ecChartInstance: any;
  salesByFeedbackOptions: EChartsOption;


  constructor(private zithApiService: ZithapiService,
              public currencyPipe: CurrencyPipe,
              public router : Router,
              private breakpointObserver: BreakpointObserver,
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

  public salesHeaderMonth = 'Total Sales'
  date: { year: number, month: number };

  today: any = new Date();
  hoursalesDate1:Date = new Date(new Date().setDate(new Date().getDate()-1));// = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  hoursalesDate2:Date = new Date() ; // = formatDate(new Date(new Date().setDate(new Date().getDate()-1)), 'yyyy-MM-dd', 'en');
  footFallDate1:Date = new Date(new Date().setDate(new Date().getDate()-1));
  footFallDate2:Date = new Date() ; // = formatDate(new Date(new Date().setDate(new Date().getDate()-1)), 'yyyy-MM-dd', 'en');
  monthsalesDate1:Date = new Date();// = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  monthsalesDate2:Date = new Date(new Date().setDate(new Date().getDate()-1)) ; // = formatDate(new Date(new Date().setDate(new Date().getDate()-1)), 'yyyy-MM-dd', 'en');

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

printChange(event:any){
  console.log(this.myFormatDate(event))
}

kLFormatter(num:any) {

  if(Math.abs(num) > 999 && Math.abs(num) <= 99999 ){
    return Math.abs(num) > 999 ? Math.sign(num)* Number((Math.abs(num)/10000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  } else if(Math.abs(num) > 99999){
    return Math.abs(num) > 99999 ? Math.sign(num)*Number((Math.abs(num)/100000).toFixed(1)) + 'L' : Math.sign(num)*Math.abs(num)
  } else {
    return num
  }
}

myFormatDate(date) {
  let currentDate = new Date(`${date}`);
  let todaydate= currentDate.getDate();
  let month= currentDate.getMonth();
  let year= currentDate.getFullYear();
  return year + '-' + ((month+1).toString()).padStart(2,'0') +'-'+ (todaydate.toString()).padStart(2,'0');
}

myFormatDateMMYY(date) {
  let currentDate = new Date(`${date}`);
  let month= currentDate.getMonth();
  let year= currentDate.getFullYear();
  return   ((month+1).toString()).padStart(2,'0') + year.toString().substr(2,2);
}

myFormatDateMMYYYY(date) {
  let currentDate = new Date(`${date}`);
  let month= currentDate.getMonth();
  let year= currentDate.getFullYear();
  return   ((month+1).toString()).padStart(2,'0') + '-' + year.toString();
}

formatList(input:Array<any>, fn:Function){
  return input.map( o => fn(o) )
}

setChartOptions(chartname:string, options:Array<any>){

  switch ( chartname ) {
    case 'horulysales':
        // statement 1
        this.hourlySalesAnalyticsOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            },
            show : !(this.hourSalesData.yaxis1.length === 0 && this.hourSalesData.yaxis2.length === 0)
          },
          // toolbox: {
          //   feature: {
          //     dataView: { show: true, readOnly: false },
          //     magicType: { show: true, type: ['line', 'line'] },
          //     restore: { show: true },
          //     saveAsImage: { show: true },
          //   },
          //   show : !(this.hourSalesData.yaxis1.length === 0 && this.hourSalesData.yaxis2.length === 0)
          // },
          legend: {
            data: [options[0], options[1]],
            top : 'bottom',

            // show : !(this.hourSalesData.yaxis1.length === 0 && this.hourSalesData.yaxis2.length === 0)
            show:false
          },
          title : {
            text : "No Data Available for these Dates",
            top : "center",
            left : "center",
            textStyle : {
              fontSize : 10
            },
            show : (this.hourSalesData.yaxis1.length === 0 && this.hourSalesData.yaxis2.length === 0)
          },
          xAxis: [
            {
              type: 'category',
              data: this.hourSalesData.xaxis,
              axisLabel : {
                color: "rgba(0, 0, 0, 1)",
                // fontWeight: "bolder",
              },
              axisPointer: {
                type: 'shadow'
              },
              show : !(this.hourSalesData.yaxis1.length === 0 && this.hourSalesData.yaxis2.length === 0)
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'Sales',
              axisLabel: {
                color: "rgba(0, 0, 0, 1)",
                // fontWeight: "bolder",
                formatter : function name(num:number) {
                  if(Math.abs(num) > 999 && Math.abs(num) <= 99999 ){
                    return '₹' + (Math.abs(num) > 999 ? Math.sign(num)* Number((Math.abs(num)/1000).toFixed(1)) + 'k' : (Math.sign(num)*Math.abs(num)).toString())
                  } else if(Math.abs(num) > 99999){
                    return '₹' + (Math.abs(num) > 99999 ? Math.sign(num)*Number((Math.abs(num)/100000).toFixed(1)) + 'L' : (Math.sign(num)*Math.abs(num)).toString())
                  } else {
                    return '₹' + num.toString()
                  }
                }
              },
              show : !(this.hourSalesData.yaxis1.length === 0 && this.hourSalesData.yaxis2.length === 0)
            },
          ],
          color:['#FF8600','#3BBEB2'],
          series: [
            {
              name: options[0],
              type: 'bar',
              data: this.hourSalesData.yaxis1
            },
            {
              name: options[1],
              type: 'bar',
              data: this.hourSalesData.yaxis2
            },
          ]
        };
        break;

    case 'hourlyff':
        // statement 2
        this.hourlyFFAnalyticsOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            },
            show : !(this.hourFFData.yaxis1.length === 0 && this.hourFFData.yaxis2.length === 0)
          },
          color:['#FF8600','#3BBEB2'],
          title : {
            text : "No Data Available for these Dates",
            top : "center",
            left : "center",
            textStyle : {
              fontSize : 10
            },
            show : (this.hourFFData.yaxis1.length === 0 && this.hourFFData.yaxis2.length === 0)
          },
          // toolbox: {
          //   feature: {
          //     dataView: { show: true, readOnly: false },
          //     magicType: { show: true, type: ['line', 'line'] },
          //     restore: { show: true },
          //     saveAsImage: { show: true }
          //   },
          //   show : !(this.hourFFData.yaxis1.length === 0 && this.hourFFData.yaxis2.length === 0)
          // },
          legend: {
            data: [options[0], options[1]],
            top : 'bottom',
            show : !(this.hourFFData.yaxis1.length === 0 && this.hourFFData.yaxis2.length === 0)
          },
          xAxis: [
            {
              type: 'category',
              data: this.hourFFData.xaxis,
              axisLabel : {
                color: "rgba(0, 0, 0, 1)",
                // fontWeight: "bolder",
              },
              axisPointer: {
                type: 'shadow'
              },
              show : !(this.hourFFData.yaxis1.length === 0 && this.hourFFData.yaxis2.length === 0)
            }
          ],
          yAxis: [
            {
              type: 'value',
              // name: 'Footfall',
              axisLabel: {
                color: "rgba(0, 0, 0, 1)",
                // fontWeight: "bolder",
                // formatter : function name(num:number) {
                //   if(Math.abs(num) > 999 && Math.abs(num) <= 99999 ){
                //     return '₹' + (Math.abs(num) > 999 ? Math.sign(num)* Number((Math.abs(num)/10000).toFixed(1)) + 'k' : (Math.sign(num)*Math.abs(num)).toString())
                //   } else if(Math.abs(num) > 99999){
                //     return '₹' + (Math.abs(num) > 99999 ? Math.sign(num)*Number((Math.abs(num)/100000).toFixed(1)) + 'L' : (Math.sign(num)*Math.abs(num)).toString())
                //   } else {
                //     return '₹' + num.toString()
                //   }
                // }
              },
              show : !(this.hourFFData.yaxis1.length === 0 && this.hourFFData.yaxis2.length === 0)
            },
          ],
          series: [
            {
              name: options[0],
              type: 'line',
              data: this.hourFFData.yaxis1
            },
            {
              name: options[1],
              type: 'line',
              data: this.hourFFData.yaxis2
            },
          ]
        };
        break;

    case 'monthlysales':
      // statement 1
      this.monthlySalesAnalyticsOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            },
            show : !(this.monthSalesData.yaxis1.length === 0 && this.monthSalesData.yaxis2.length === 0)
          }
        },
        title : {
          text : "No Data Available for these Dates",
          top : "center",
          left : "center",
          textStyle : {
            fontSize : 10
          },
          show : (this.monthSalesData.yaxis1.length === 0 && this.monthSalesData.yaxis2.length === 0)
        },
        color:['#FF8600','#3BBEB2'],
        // toolbox: {
        //   feature: {
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ['line', 'line'] },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   },
        //   show : !(this.monthSalesData.yaxis1.length === 0 && this.monthSalesData.yaxis2.length === 0)
        // },
        legend: {
          data: [options[0], options[1]],
          top : 'bottom',
          show : !(this.monthSalesData.yaxis1.length === 0 && this.monthSalesData.yaxis2.length === 0)
        },
        xAxis: [
          {
            type: 'category',
            data: this.monthSalesData.xaxis,
            axisLabel : {
              color: "rgba(0, 0, 0, 1)",
              // fontWeight: "bolder",
            },
            axisPointer: {
              type: 'shadow'
            },
            show : !(this.monthSalesData.yaxis1.length === 0 && this.monthSalesData.yaxis2.length === 0)
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Sales',
            axisLabel: {
              color: "rgba(0, 0, 0, 1)",
              // fontWeight: "bolder",
              formatter : function name(num:number) {
                if(Math.abs(num) > 999 && Math.abs(num) <= 99999 ){
                  return '₹' + (Math.abs(num) > 999 ? Math.sign(num)* Number((Math.abs(num)/1000).toFixed(1)) + 'k' : (Math.sign(num)*Math.abs(num)).toString())
                } else if(Math.abs(num) > 99999){
                  return '₹' + (Math.abs(num) > 99999 ? Math.sign(num)*Number((Math.abs(num)/100000).toFixed(1)) + 'L' : (Math.sign(num)*Math.abs(num)).toString())
                } else {
                  return '₹' + num.toString()
                }
              }
            },
            show : !(this.monthSalesData.yaxis1.length === 0 && this.monthSalesData.yaxis2.length === 0)
          },
        ],
        series: [
          {
            name: options[0],
            type: 'bar',
            data: this.monthSalesData.yaxis1
          },
          {
            name: options[1],
            type: 'bar',
            data: this.monthSalesData.yaxis2
          },
        ]
      };
      break;

    case 'monthlyff':
          // statement 2
          this.monthlyFFAnalyticsOption = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              },
              show : !(this.monthFFData.yaxis1.length === 0 && this.monthFFData.yaxis2.length === 0)
            },
            // toolbox: {
            //   feature: {
            //     dataView: { show: true, readOnly: false },
            //     magicType: { show: true, type: ['line', 'line'] },
            //     restore: { show: true },
            //     saveAsImage: { show: true }
            //   },
            //   show : !(this.monthFFData.yaxis1.length === 0 && this.monthFFData.yaxis2.length === 0)
            // },
            color:['#FF8600','#3BBEB2'],
            legend: {
              data: [options[0], options[1]],
              top : 'bottom',
              show : !(this.monthFFData.yaxis1.length === 0 && this.monthFFData.yaxis2.length === 0)
            },
            title : {
              text : "No Data Available for these Dates",
              top : "center",
              left : "center",
              textStyle : {
                fontSize : 10
              },
              show : (this.monthFFData.yaxis1.length === 0 && this.monthFFData.yaxis2.length === 0)
            },
            xAxis: [
              {
                type: 'category',
                data: this.monthFFData.xaxis,
                axisLabel : {
                  color: "rgba(0, 0, 0, 1)",
                  // fontWeight: "bolder",
                },
                axisPointer: {
                  type: 'shadow'
                },
                show : !(this.monthFFData.yaxis1.length === 0 && this.monthFFData.yaxis2.length === 0)
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: 'Footfall',
                axisLabel: {
                  color: "rgba(0, 0, 0, 1)",
                  // fontWeight: "bolder",
                  // formatter : function name(num:number) {
                  //   if(Math.abs(num) > 999 && Math.abs(num) <= 99999 ){
                  //     return '₹' + (Math.abs(num) > 999 ? Math.sign(num)* Number((Math.abs(num)/10000).toFixed(1)) + 'k' : (Math.sign(num)*Math.abs(num)).toString())
                  //   } else if(Math.abs(num) > 99999){
                  //     return '₹' + (Math.abs(num) > 99999 ? Math.sign(num)*Number((Math.abs(num)/100000).toFixed(1)) + 'L' : (Math.sign(num)*Math.abs(num)).toString())
                  //   } else {
                  //     return '₹' + num.toString()
                  //   }
                  // }
                },
                show : !(this.monthFFData.yaxis1.length === 0 && this.monthFFData.yaxis2.length === 0)
              },
            ],
            series: [
              {
                name: options[0],
                type: 'line',
                data: this.monthFFData.yaxis1
              },
              {
                name: options[1],
                type: 'line',
                data: this.monthFFData.yaxis2
              },
            ]
          };
          break;

    case 'weekdayFFday':
      this.weekdayFFdayChartOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            },
            show : this.ffData.length!==0
          }
        },
        color:['#FEAF00','#2E446E','#9FCC00','#1EA614','#FF825A'],
        title : {
          text : "No Data Available for these Dates",
          top : "center",
          left : "center",
          textStyle : {
            fontSize : 10
          },
          show : this.ffData.length===0
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'line'] },
            restore: { show: true },
            saveAsImage: { show: true }
          },
          show : this.ffData.length!==0
        },
        series: [
          {
            radius: '55%',
            // center: ['50%', '50%'],
            type: 'pie',
            label: {
              show : this.ffData.length!==0,
              fontSize : options[0],
              formatter : function (params) {
                return `${params.name}: \n (${params.percent}%)`;
                // ${params.data['value']}
              }
             },
            labelLine: {
              show: this.ffData.length!==0,
              smooth :true,
              length : 0.02,
              length2 : 0.02
            },
            data: this.ffData,
            roseType: 'radius'
          }
        ]
      };
      break;
    
    case 'salesByFeedback':
      console.log(options);
      let sByFeed = Object.keys(options);
      let sByFeed1 = Object.values(options);

      console.log(sByFeed);
      console.log(sByFeed1);
      this.salesByFeedbackOptions = {
        legend: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: sByFeed1[0]
          },
          {
            type: 'category',
            boundaryGap: true,
            data: sByFeed1[1]
          },
        ],
        yAxis: [
          
        //   {
        //     type: 'value',
        //     scale: true,
        //     // max: 10000,
        //     // min: 0,
        //     axisLabel: {
        //       color: "rgba(0, 0, 0, 1)",
        //       // fontWeight: "bolder",
        //       formatter : function name(num:number) {
        //         // if(Math.abs(num) > 999 && Math.abs(num) <= 99999 ){
        //         //   return '₹' + (Math.abs(num) > 999 ? Math.sign(num)* Number((Math.abs(num)/10000).toFixed(1)) + 'k' : (Math.sign(num)*Math.abs(num)).toString())
        //         // } else if(Math.abs(num) > 99999){
        //         //   return '₹' + (Math.abs(num) > 99999 ? Math.sign(num)*Number((Math.abs(num)/100000).toFixed(1)) + 'L' : (Math.sign(num)*Math.abs(num)).toString())
        //         // } else {
        //         //   return '₹' + num.toString()
        //         // }
        //         let res = [];
        //         let len = 10;
        //         while (len--) {
        //           res.push(10 - len - 1);
        //         }
        //         return res.toString();

        //     }
        //   }
        // },
        {
          type: 'value',
          scale: true,
          // name: 'Price',
          max: 10000,
          min: 0,
          boundaryGap: [0.1, 0.1]
        },  
        {
            type: 'value',
            scale: true,
            // name: 'Price',
            max: 100,
            min: 0,
            boundaryGap: [0.1, 0.1]
          }
        ],
        series: [
          {
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: sByFeed1
          }
        ],
        color:['#FF8600','#3BBEB2'],
        
      };

      break;
      


  }
}



  onChartClick(event) {
    console.log(event);

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
          console.log(val)
          this.selectedSubMerchants = [{
            name: 'aa',
            id: val
          }];
          this.applyButton()
        }  )



    }}, error => {

    });
   }

   filterMerchant(event) {
    this.zithApiService.searchPrimaryMerchants(event.query)
    .subscribe(data => {
      this.merchantsData = data.body.data;
    }, error => {
  
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

  ffdaychartInit(ec){
    this.ecChartInstance = ec

    // this.ecChartInstance.resize({
    //   width: 300,
    //   height: 150
    // })
  }

  onGetData() {
    console.log("dfdfdfd");
  }

  closemulti(){
    // this.selsubmerchant.overlayVisible = false
    this.closemultibool = false
    // this.selsubmerchant.hideOverlay;

  }


  test(){
    console.log("TRIGGERED")
  }

  getAllParMerchants(): void{
    this.zithApiService.getPrimaryMerchants()
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.merchantsData = data.body.data;
      if(Array.from(data.body.data).length > 0){
        this.selectedMerchants = data.body.data[0].id;
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
    console.log(this.selectedMerchants);
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
    // this.showskel1=t
    // this.getMonthSales(this.selectedSubMerchants.map(o => o['id'] ));
    this.onChangeDateHourSalesFF()
    this.onChangeDateMonthSalesFF()
    this.onChangeWeekDayFFDay()
    this.getSalesByFeedback();

  }
  getSalesByFeedback(){
    console.log(this.selectedSubMerchants.map(o => o['id'] ));
    this.zithApiService.getAVGTranByFeedbacks(this.selectedSubMerchants.map(o => o['id'] ))
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      console.log(data);
      this.showskel1 = false;
      this.setChartOptions('salesByFeedback',data.data)
    }, error => {

    });
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

  onChangeDateHourSalesFF(){
    this.getHourSales(this.selectedSubMerchants.map(o => o['id'] ));
    this.getHourFF(this.selectedSubMerchants.map(o => o['id'] ));
  }

  getHourSales(submerchantids){

    this.zithApiService.getHourSalesAnalytics(submerchantids,this.myFormatDate(this.hoursalesDate1),
    this.myFormatDate(this.hoursalesDate2)).subscribe({
      next: (data : Array<myChartInterface>) => {

        console.log(data)
        if(data[0].xaxis.length >= data[1].xaxis.length){
          this.hourSalesData = {
            xaxis : data[0].xaxis,
            yaxis1 : data[0].yaxis,
            yaxis2 : data[1].yaxis
          }
          this.setChartOptions('horulysales',[this.myFormatDate(this.hoursalesDate1),this.myFormatDate(this.hoursalesDate2)])


        } else {

          this.hourSalesData = {
            xaxis : data[1].xaxis,
            yaxis1 : data[0].yaxis,
            yaxis2 : data[1].yaxis
          }
          this.setChartOptions('horulysales',[this.myFormatDate(this.hoursalesDate1),this.myFormatDate(this.hoursalesDate2)])



        }

      },
      error : error => {

      }
    })

  }

  getHourFF(submerchantids){

    this.zithApiService.getHourFFAnalytics(submerchantids,this.myFormatDate(this.footFallDate1),
    this.myFormatDate(this.footFallDate2)).subscribe({
      next: (data : Array<myChartInterface>) => {

        console.log(data)
        if(data[0].xaxis.length >= data[1].xaxis.length){
          this.hourFFData = {
            xaxis  : data[0].xaxis,
            yaxis1 : data[0].yaxis,
            yaxis2 : data[1].yaxis
          }
          this.setChartOptions('hourlyff',[this.myFormatDate(this.hoursalesDate1),this.myFormatDate(this.hoursalesDate2)])


        } else {

          this.hourFFData = {
            xaxis  : data[1].xaxis,
            yaxis1 : data[0].yaxis,
            yaxis2 : data[1].yaxis
          }
          this.setChartOptions('hourlyff',[this.myFormatDate(this.hoursalesDate1),this.myFormatDate(this.hoursalesDate2)])


        }

      },
      error : error => {

      }
    })

  }


  onChangeDateMonthSalesFF(){
    this.getMonthSales(this.selectedSubMerchants.map(o => o['id'] ));
    this.getMonthFF(this.selectedSubMerchants.map(o => o['id'] ));
  }

  getMonthSales(submerchantids){

    this.zithApiService.getMonthSalesAnalytics(submerchantids,this.myFormatDateMMYY(this.monthsalesDate1),
    this.myFormatDateMMYY(this.monthsalesDate2)).subscribe({
      next: (data : Array<myChartInterface>) => {

        console.log(data)
        if(data[0].xaxis.length >= data[1].xaxis.length){
          this.monthSalesData = {
            xaxis : data[0].xaxis,
            yaxis1 : data[0].yaxis,
            yaxis2 : data[1].yaxis
          }
          this.setChartOptions('monthlysales',[this.myFormatDateMMYYYY(this.monthsalesDate1.toString()),
            this.myFormatDateMMYYYY(this.monthsalesDate2.toString())])


        } else {

          this.monthSalesData = {
            xaxis : data[1].xaxis,
            yaxis1 : data[0].yaxis,
            yaxis2 : data[1].yaxis
          }
          this.setChartOptions('monthlysales',[this.myFormatDateMMYYYY(this.monthsalesDate1.toString()),
            this.myFormatDateMMYYYY(this.monthsalesDate2.toString()) ])
        }

      },
      error : error => {

      }
    })

  }

  getMonthFF(submerchantids){

    this.zithApiService.getMonthFFAnalytics(submerchantids,this.myFormatDateMMYY(this.monthsalesDate1),
    this.myFormatDateMMYY(this.monthsalesDate2)).subscribe({
      next: (data : Array<myChartInterface>) => {

        // console.log(data)
        if(data[0].xaxis.length >= data[1].xaxis.length){
          this.monthFFData = {
            xaxis  : data[0].xaxis,
            yaxis1 : data[0].yaxis,
            yaxis2 : data[1].yaxis
          }
          this.setChartOptions('monthlyff',[this.myFormatDateMMYYYY(this.monthsalesDate1.toString()),
            this.myFormatDateMMYYYY(this.monthsalesDate2.toString())])


        } else {

          this.monthFFData = {
            xaxis  : data[1].xaxis,
            yaxis1 : data[0].yaxis,
            yaxis2 : data[1].yaxis
          }
          this.setChartOptions('monthlyff',[this.myFormatDateMMYYYY(this.monthsalesDate1.toString()),
            this.myFormatDateMMYYYY(this.monthsalesDate2.toString())])


        }

      },
      error : error => {

      }
    })

  }

  onChangeWeekDayFFDay(){
    this.getFFInaDay(this.selectedSubMerchants.map(o => o['id'] ));
  }

  getFFInaDay(submerchantids){
    this.zithApiService.getDayFFSalesAnalytics(submerchantids,this.myFormatDate(this.fromDateFFDay),
    this.myFormatDate(this.toDateFFDay),this.weekDayFFDay).subscribe({
      next: data => {
        this.ffData = data['data']

        if(this.smallscreen){
          this.setChartOptions('weekdayFFday',[8])
        } else {
          this.setChartOptions('weekdayFFday',[12])
        }



      },
      error:error => {

      }
    })
  }

}

