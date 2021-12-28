import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { ZithapiService } from '../../../shared/services/zithapi.service';


@Component({
  selector: 'app-intiate-refund',
  templateUrl: './intiate-refund.component.html',
  styleUrls: ['./intiate-refund.component.scss']
})
export class IntiateRefundComponent implements OnInit {
  otpMessage: string;
  inputOTP: string;
  transactionid: string;

  @ViewChild('cd',{static:false}) private countdown:CountdownComponent
  notify: string;
  disableResend: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private toastr: ToastrService,
    private zithApiService: ZithapiService
  ) { }

  ngOnInit(): void {
    this.transactionid = this.route.snapshot.queryParamMap.get('id');
    this.initiateRefund(this.transactionid)
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

  showSuccess(message) {
    this.toastr.success(message);
  }

  showError(message) {
    this.toastr.error(message);
  }

  cancel(){
    // this.router.navigate(['transactions/initiate-refund'],{ queryParams: {id: transaction} });
    this.router.navigate(['transactions']);
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

  checkCountdown(e: CountdownEvent) {
    // this.notify = e.action.toUpperCase();
    // if (e.action === 'notify') {
    //   this.notify += ` - ${e.left} ms`;
    // }

    if(e.action === 'done'){
      this.otpMessage = "OTP expired"
      this.disableResend = false
    }
  }

}
