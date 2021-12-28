import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ZithapiService } from '../../../../shared/services/zithapi.service';

@Component({
  selector: 'app-terminal-component',
  templateUrl: './terminal-component.component.html',
  styleUrls: ['./terminal-component.component.scss']
})
export class TerminalComponentComponent implements OnInit {

  submerid: any;
  terminals: any;
  chgpass: boolean;
  selectedTerminal: any;
  chgpassword : string;
  selectedTerminalName: any;

  selectedUserid: any;
  changePasswordDetails = {
    id : '',
    password : ''
  }

  constructor(
    private zithapiservice : ZithapiService,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {

    this.submerid = this.route.snapshot.paramMap.get('submerid');
    this.getTerminals(this.submerid);

  }

  getTerminals(submer){
    this.zithapiservice.getTerminalIDs([submer],true).subscribe({
      next : res => {
        this.terminals = res.data
        console.log(res)
      },
      error: error => {

        console.log(error);
      }
    })
  }

  showPassword(terminalid){
    this.chgpass = true
    this.selectedTerminal = terminalid;
    Array.from(this.terminals).filter( o => o['id'] === terminalid )
    .map( b =>  {
      this.selectedTerminalName = b['terminal_name']
      this.selectedUserid = b['userid']

    } )
  }

  cancelShowPass(){
    this.chgpass = false
    this.selectedTerminal = undefined
  }

  showSuccess(message) {
    this.toast.success(message);
  }

  changePassword(){

    this.changePasswordDetails.id = this.selectedUserid;
    this.changePasswordDetails.password = this.chgpassword;
    console.log(this.changePasswordDetails);
    this.zithapiservice.changeMerchantPassword(this.changePasswordDetails).subscribe({
      next : res => {
        this.showSuccess('Password Changed Successfully');
        this.cancelShowPass();
      },
      error: error => {
        console.log(error);
      }
    });

  }

}
