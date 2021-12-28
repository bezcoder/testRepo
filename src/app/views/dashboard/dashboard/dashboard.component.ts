import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../model/roles';
import { ZithapiService } from '../../../shared/services/zithapi.service';
import { Subscription } from 'rxjs';
import { AppConfig, AppConfigService } from '../../../services/appconfig.service';
declare var require: any;
const primary = localStorage.getItem('primary_color') || '#4466f2';
const secondary = localStorage.getItem('secondary_color') || '#1ea6ec';

export var dailyChartLabels: string[] = ['New', 'Repeated', 'All'];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  showskel1: boolean = true;
  showskel2: boolean = true;
  fullname: string;
  groupname: string;
  showname: boolean = false;
  showgroupname: boolean =false;

  @ViewChild('selsubmerchant') selsubmerchant;
  yesterdaySale: number;
  changeOfSale: string;
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
  public months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public todaydate = new Date();
  month = this.todaydate.getMonth();
  year = this.todaydate.getFullYear();
  public currentMonth = this.months[this.month] + " " + this.year;
  public previousMonth = this.months[this.month-1] + " " + this.year;

  customerFeedbackOptions: EChartsOption;

  public pieChartColor: any = [
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
  public pieChartData: any = [
    {
      data: []
    }
  ];
  public daySalesPieChartColor: any = [
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
  public daySalesPieChartData: any = [
    {
      data: []
    }
  ];
  changeOfVisits: string;
  changeOfSaleMonth: string;
  changeOfVisitsMonth: string;
  showtotalsales: boolean;
  showtotalsalesMonth: boolean;
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
  avg_feedback: any;

  constructor(private zithApiService: ZithapiService,
    public currencyPipe: CurrencyPipe,
    public router: Router,
    public roleService: RoleService) {
      this.zithApiService.getFullNameKC().toPromise().then(data => {
        this.fullname = data
        console.log("FULNAME",this.fullname)
        this.showname = true
      })
  
      this.zithApiService.getGroupNameKC().toPromise().then(data => {
        this.groupname = data
        console.log("GROUPNAME", this.groupname)
        this.showgroupname = true
      })
     }

  textreducer(label:string){
    label = label.split(" ")[0]
    if(label.length > 10){
      label = label.substr(0,10) + '...'
      return label
    } else {
      return label
    }
  }
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

  chartOptionTotalSalesTodaySum: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: 'value',
      max: function (value) {
        return value.max * 10000;
      }
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'bar',
      },
    ],
  };

  chartOptionTotalSalesTodayAverage: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: 'value',
      max: function (value) {
        return value.max * 10000;
      }
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'bar',
      },
    ],
  };

  new_repeat_options: EChartsOption = {
    legend: {
      // orient: 'vertical',
      // top: 'left',
      top: '100px',
      // data: ['New', 'Repeat'],
      // textStyle: {
      //   fontSize: "0.6rem"
      // }
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
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
            fontSize: '0.7rem',
            fontWeight: 'bold',
            formatter: function (params) {

              return `${params.name}: ${params.data['value']} (${params.percent}%)
                       `;
            }
          },



        },
        data: [
          { value: 10, name: 'New' },
          { value: 20, name: 'Repeat' }
        ],
        center: ['80%', '40%']

      }
    ]
  };

  chartOptionTotalSalesMonthSum: EChartsOption = {
    xAxis: {
      type: 'value',
      max: function (value) {
        return value.max * 10000;
      }
    },
    yAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true,
      },
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'bar',
      },
    ],
  };

  chartOptionTotalSalesMonthAverage: EChartsOption = {
    xAxis: {
      type: 'value',
      max: function (value) {
        return value.max * 10000;
      }
    },
    yAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true,
      },
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'bar',
      },
    ],
  };

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

    if (!(await this.roleService.hasRole([Role.SuperUser, Role.Admin]))) {

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

  initMerchant() {
    this.zithApiService.getUserRolesKC().subscribe((data: Array<String>) => {
      if (data.includes(Role.SuperUser)) {

        this.getAllParMerchants();

      } else if (data.includes(Role.Admin)) {

        this.getAllSubMerchants()

      } else {

        this.roleService.getPrimeid().then(val => {
          console.log(val)
          this.selectedSubMerchants = [{
            name: 'aa',
            id: val
          }];
          this.applyButton()
        })



      }
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



  onGetData() {
    console.log("dfdfdfd");
  }

  closemulti() {
    this.selsubmerchant.overlayVisible = false
    // selsubmerchant.hideOverlay();

  }

  getAllParMerchants(): void {
    this.zithApiService.getPrimaryMerchants()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(data => {
        this.merchantsData = data.body.data;
        if (Array.from(data.body.data).length > 0) {
          this.selectedMerchants = data.body.data[0].id;
        }

        this.showskel1 = false

        // console.log(this.selectedMerchants,'-----selected merchants');
        if (Array.from(data.body.data).length > 0) {
          this.getSubMerchantsByParents()
        }
      }, error => {

      });
  }



  getSubMerchantsByParents(): void {
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
    this.showskel2 = true
    this.showtotalsales = false
    this.showtotalsalesMonth = false
    this.getDashboardDataToday(this.selectedSubMerchants.map(o => o['id']), 'sum');
    this.getDashboardDataMonth(this.selectedSubMerchants.map(o => o['id']), 'sum');

    this.getDashboardDataToday(this.selectedSubMerchants.map(o => o['id']), 'average');
    this.getDashboardDataMonth(this.selectedSubMerchants.map(o => o['id']), 'average');

    this.getNewCustomers(this.selectedSubMerchants.map(o => o['id']));
    // this.getRepeatCustomers(this.selectedSubMerchants.map(o => o['id'] ));
    this.getCustomerBase(this.selectedSubMerchants.map(o => o['id']));
    this.getMonthSales(this.selectedSubMerchants.map(o => o['id']));
    this.getTodaySales(this.selectedSubMerchants.map(o => o['id']));
    this.getVisitsMonth(this.selectedSubMerchants.map(o => o['id']));
    this.getVisitsToday(this.selectedSubMerchants.map(o => o['id']));
    this.getTransactions(this.selectedSubMerchants.map(o => o['id']));
  }
  getTransactions(submerchantid) {
    const startDate = this.formatDate(new Date());
    const endDate = this.formatDate(new Date());
    if (submerchantid !== undefined) {

      this.zithApiService.getFeedbacks(startDate, endDate, 1, Math.max(0, 1), submerchantid)
        // tslint:disable-next-line: no-shadowed-variable
        .subscribe(data => {
          // // console.log(data);
          // this.showfirst = true
          // this.showtable = true
          // this.transactionsData = data.pages.content;
          this.avg_feedback = data.avg;
          this.generateChart('feedback_chart')

          // this.transactionsDataCount = data.pages.total;
          // if(data.pages.total === 0){
          //   this.disableDownload = true
          // } else {
          //   this.disableDownload = false
          // }
          // this.loading = false;
          // console.log(this.transactionsData);
        }, error => {

        });
    }
  }


  getDashboardDataToday(submerchantids, metricToday) {
    this.zithApiService.getTotalSalesApi('weekdays', metricToday, submerchantids).subscribe(
      data => {
        // console.log(data)
        // console.log(this.chartOptionTotalSalesToday.xAxis['data'])
        if (metricToday === 'sum') {
          this.chartOptionTotalSalesTodaySum = {
            color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            xAxis: {
              type: 'value',
              axisLabel: {
                color: "rgba(0, 0, 0, 1)",
                show: false,
                fontStyle: "normal",
                // fontWeight: "bolder",
                fontFamily: "Arial",
                fontSize: 12,
                formatter: function name(num: number) {
                  if (Math.abs(num) > 999 && Math.abs(num) <= 99999) {
                    return '₹' + (Math.abs(num) > 999 ? Math.sign(num) * Number((Math.abs(num) / 10000).toFixed(1)) + 'k' : (Math.sign(num) * Math.abs(num)).toString())
                  } else if (Math.abs(num) > 99999) {
                    return '₹' + (Math.abs(num) > 99999 ? Math.sign(num) * Number((Math.abs(num) / 100000).toFixed(1)) + 'L' : (Math.sign(num) * Math.abs(num)).toString())
                  } else {
                    return '₹' + num.toString()
                  }
                }
              }

            },
            yAxis: {

              type: 'category',
              data: this.chartOptionTotalSalesTodaySum.xAxis['data'] = data['xaxis'],
              axisTick: {
                alignWithLabel: true,
              },

              axisLabel: {
                color: "rgba(0, 0, 0, 1)",
                fontStyle: "normal",
                // fontWeight: "bolder",
                fontFamily: "Arial",
                fontSize: 12,


              }
              //         ,
              //   max: function (value) {
              //     return value.max * 1.5;
              // }
            },
            series: [
              {
                name: 'Sales',
                data: this.chartOptionTotalSalesTodaySum.series['data'] = data['yaxis'],
                type: 'bar',
                color: '#549bc5'
              },

            ],

          };
        } else {
          this.chartOptionTotalSalesTodayAverage = {
            color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            xAxis: {

              type: 'value',
              axisLabel: {
                color: "rgba(0, 0, 0, 1)",
                fontStyle: "normal",
                // fontWeight: "bolder",
                fontFamily: "Arial",
                fontSize: 12,
                formatter: function (value: string) {

                  value = value.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")
                  // value=this.cp.transform(value, 'INR');
                  return '₹' + value
                }
              }



            },
            yAxis: {

              type: 'category',
              data: this.chartOptionTotalSalesTodayAverage.xAxis['data'] = data['xaxis'],
              axisTick: {
                alignWithLabel: true,
              },

              axisLabel: {
                color: "rgba(0, 0, 0, 1)",
                fontStyle: "normal",
                // fontWeight: "bolder",
                fontFamily: "Arial",
                fontSize: 12
              }




              //         ,
              //   max: function (value) {
              //     return value.max * 1.5;
              // }
            },
            series: [
              {
                name: 'Sales',
                data: this.chartOptionTotalSalesTodayAverage.series['data'] = data['yaxis'],
                type: 'line',
                smooth: true,
                color: '#549bc5'
              },

            ],

          };
        }

        this.showtotalsales = true

      },
      error => {

      }
    )

  }

  getDashboardDataMonth(submerchantids, metricMonth) {


    this.zithApiService.getTotalSalesApi('months', metricMonth, submerchantids).subscribe(
      data => {
        console.log(data)

        if (metricMonth === 'sum') {

          this.chartOptionTotalSalesMonthSum = {
            color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            xAxis: {

              type: 'value',
              show: false,
              // axisLabel: {
              //   color: "rgba(0, 0, 0, 1)",
              //   fontStyle: "normal",
              //   fontWeight: "bolder",
              //   fontFamily: "Arial",
              //   fontSize: 12,
              //   formatter : function(value:string){

              //     value = value.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")
              //     // value=this.cp.transform(value, 'INR');
              //     return '₹'+value
              //   }
              // }


            },
            yAxis: {

              type: 'category',
              data: this.chartOptionTotalSalesMonthSum.xAxis['data'] = data['xaxis'],
              axisTick: {
                alignWithLabel: true,
              },

              axisLabel: {
                color: "rgba(0, 0, 0, 1)",
                fontStyle: "normal",
                // fontWeight: "bolder",
                fontFamily: "Arial",
                fontSize: 12
              }
              //         ,
              //   max: function (value) {
              //     return value.max * 1.5;
              // }
            },
            series: [
              {
                name: 'Sales',
                data: this.chartOptionTotalSalesMonthSum.series['data'] = data['yaxis'],
                type: 'bar',
                color: '#549bc5'
              },

            ],

          };

        } else {

          this.chartOptionTotalSalesMonthAverage = {
            color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            xAxis: {

              type: 'category',
              data: this.chartOptionTotalSalesMonthAverage.xAxis['data'] = data['xaxis'],
              axisTick: {
                alignWithLabel: true,
              },

              axisLabel: {
                color: "rgba(0, 0, 0, 1)",
                fontStyle: "normal",
                // fontWeight: "bolder",
                fontFamily: "Arial",
                fontSize: 12
              }


            },
            yAxis: {

              type: 'value',
              axisLabel: {
                color: "rgba(0, 0, 0, 1)",
                fontStyle: "normal",
                // fontWeight: "bolder",
                fontFamily: "Arial",
                fontSize: 12,
                formatter: function name(num: number) {
                  if (Math.abs(num) > 999 && Math.abs(num) <= 99999) {
                    return '₹' + (Math.abs(num) > 999 ? Math.sign(num) * Number((Math.abs(num) / 10000).toFixed(1)) + 'k' : (Math.sign(num) * Math.abs(num)).toString())
                  } else if (Math.abs(num) > 99999) {
                    return '₹' + (Math.abs(num) > 99999 ? Math.sign(num) * Number((Math.abs(num) / 100000).toFixed(1)) + 'L' : (Math.sign(num) * Math.abs(num)).toString())
                  } else {
                    return '₹' + num.toString()
                  }
                }
              }


              //         ,
              //   max: function (value) {
              //     return value.max * 1.5;
              // }
            },
            series: [
              {
                name: 'Sales',
                data: this.chartOptionTotalSalesMonthAverage.series['data'] = data['yaxis'],
                type: 'line',
                smooth: true,
                color: '#549bc5'
              },

            ],

          };

        }

        this.showtotalsalesMonth = true

      },
      error => {

      }
    )


  }

  onChangeTotalSalesSum(event) {

    this.metricToday = 'sum';
    this.modeToday = 'weekdays'

    this.getDashboardDataToday(this.selectedSubMerchants.map(o => o['id']), 'sum')

  }

  onChangeTotalSalesAverage(event) {

    this.metricToday = 'average';
    this.modeToday = 'weekdays'

    this.getDashboardDataToday(this.selectedSubMerchants.map(o => o['id']), 'average')

  }

  onChangeTotalSalesMonthSum(event) {

    this.metricMonth = 'sum';
    this.modeMonth = 'months'

    this.getDashboardDataMonth(this.selectedSubMerchants.map(o => o['id']), 'sum')

  }

  onChangeTotalSalesMonthAverage(event) {

    this.metricMonth = 'average';
    this.modeMonth = 'months'

    this.getDashboardDataMonth(this.selectedSubMerchants.map(o => o['id']), 'average')

  }

  // { value: 1, name: 'New' },
  // { value: 2, name: 'Repeat' }

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

            var new_data = [
              { name: 'New', value: this.newCustomers },
              { name: 'Repeat', value: this.repeatedCustomers }
            ]

            this.new_repeat_options = {
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                top: 'center',
                orient: 'vertical',
                left: 0,
                // top: 'left',
                // data: ['New', 'Repeat'],
                // textStyle: {
                //   fontSize: "0.6rem"
                // }
              },
              series: [
                {
                  type: 'pie',
                  radius: ['40%', '60%'],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: 'center',
                    fontSize: '0.7rem'
                  },
                  labelLine: {
                    show: false
                  },
                  color:['#FF8600', '#3BBEB2'],
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      formatter: function (params) {

                        return `${params.name}: ${params.data['value']} (${params.percent}%)
                           `;
                      }
                    },



                  },
                  data: this.new_repeat_options.series['data'] = new_data,
                }
              ],
            };
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

  getMonthSales(submerchantids) {
    console.log(submerchantids);
    this.zithApiService.getMonthSales(submerchantids)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(data => {
        this.currentMonthSales = data.thisMonth;
        this.previousMonthSales = data.lastMonth;

        this.changeOfSaleMonth = this.changeValueFormatter(data.thisMonth, data.lastMonth)
        this.pieChartData = [
          {
            data: []
          }]

        this.pieChartData[0].data.push(data.thisMonth);
        this.pieChartData[0].data.push(data.lastMonth);
        console.log(data);
      }, error => {

      });
  }

  getTodaySales(submerchantids) {
    console.log(submerchantids);
    this.zithApiService.getTodaySales(submerchantids)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(data => {
        // this.todaySale = data.today;
        this.todaySale = data.today;
        this.yesterdaySale = data.yesterday;

        this.changeOfSale = this.changeValueFormatter(data.today, data.yesterday)
        this.daySalesPieChartData = [
          {
            data: []
          }]
        this.daySalesPieChartData[0].data.push(data.today);
        this.daySalesPieChartData[0].data.push(data.yesterday);
        // console.log(data);
      }, error => {

      });
  }

  getVisitsMonth(submerchantids) {
    console.log(submerchantids);
    this.zithApiService.getVisitsMonth(submerchantids)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(data => {
        this.currentMonthVisits = data.thisMonth;
        this.previousMonthVisits = data.lastMonth;

        this.changeOfVisitsMonth = this.changeValueFormatter(data.thisMonth, data.lastMonth)

        console.log(data);
      }, error => {

      });
  }

  getVisitsToday(submerchantids) {
    console.log(submerchantids);
    this.zithApiService.getVisitsToday(submerchantids)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(data => {
        this.todayVisits = data.today;
        this.yesterdayVisits = data.yesterday;

        this.changeOfVisits = this.changeValueFormatter(data.today, data.yesterday)

        console.log(data);
      }, error => {

      });
  }

  changeValueFormatter(latest, previous) {
    var output = '';
    var change = ((((latest - previous) / previous) * 100))
    if (!Number.isFinite(change)) {
      output = ''
    } else if (change < 0) {
      output = (change * -1).toFixed(2).toString() + '%'
    } else {
      output = (change).toFixed(2).toString() + '%'
    }

    return output

  }

  generateChart(chartname: string, options?: Array<any>) {

    switch (chartname) {
      case 'feedback_chart':
        this.customerFeedbackOptions = {
          series: [
            {
              name: '',
              type: 'gauge',
              startAngle: 180,
              endAngle: 0,
              min: 0,
              max: 5,
              splitNumber: 5,
              // detail: { formatter: '{value}' },
              title: {
                offsetCenter: [0, '-20%'],
                fontSize: 10
              },
              detail: {
                fontSize: 20,
                offsetCenter: [0, '0%'],
                valueAnimation: true,
                formatter: function (value) {
                  return value + '/5';
                },
                color: 'auto'
              },
              data: [
                {
                  value: parseFloat(this.avg_feedback.toFixed(2)),
                  name: 'Average Feedback'
                }
              ],
              itemStyle: {
                color: '#1B1B1F'
              },
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
              axisTick: {
                splitNumber: 2,
                lineStyle: {
                  width: 0,
                  color: '#999'
                }
              },
              splitLine: {
                length: 12,
                lineStyle: {
                  width: 0,
                  color: '#999'
                }
              },
              axisLabel: {
                distance: 30,
                color: 'transparent',
                fontSize: 20
              },
              pointer: {
                icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                length: '12%',
                width: 20,
                offsetCenter: [0, '-60%'],
                itemStyle: {
                  color: 'auto'
                }
              },
              // axisLabel: {
              //   color: '#464646',
              //   fontSize: 10,
              //   distance: -40,
              //   formatter: function (value) {
              //     if (value === 1) {
              //       return '1';
              //     } else if (value === 2) {
              //       return '2';
              //     } else if (value === 3) {
              //       return '3';
              //     } else if (value === 4) {
              //       return '4';
              //     } else if (value === 5) {
              //       return '5';
              //     }
              //     return '';
              //   }
              // },
            }
          ]
        };
        break;
    }
  }

  formatDate(date) {
    let currentDate = new Date(`${date}`);
    let todaydate = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    return year + '-' + ((month + 1).toString()).padStart(2, '0') + '-' + (todaydate.toString()).padStart(2, '0');
  }

}

