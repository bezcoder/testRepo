import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../../shared/services/role.service';
import { ZithapiService } from '../../../shared/services/zithapi.service';
import { MessageService, ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { validationMessages } from '../../../model/validation_messages.model';
import { FeedbackConfigAddRequest } from '../../../model/feedback/config';
import { Role } from '../../../model/roles';

type PasswordFields = 'password' ;
type PasswordsFormErrors = { [u in PasswordFields]: string };

export interface ThemeConfig {
  id?:string;
  name?:string;
}

@Component({
  selector: 'app-feedback-config',
  templateUrl: './feedback-config.component.html',
  styleUrls: ['./feedback-config.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class FeedbackConfigComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public validationMessages = validationMessages;
  public sidebaron: any;
  val1:number = 1
  val2:number = 2
  val3:number = 3
  val4:number = 4
  val5:number = 5
  changePasswordDetails = {
    id: '',
    password: ''
  };
  public formErrors: PasswordsFormErrors = {
    password: '',
  };

  public errorMessage: any;
    parentName: string;
    childName: string;

    submitted: boolean;

    statuses: any[];

    // --------------------------------------------------------
  selectedSubMerchant: string;
  config: any;
  dataarr: { id: number; value: number; }[];
  showedit: any;
  optionArray: { id: number; min: number; max: number; name: string; icon:string }[];
  selectedOption: any;
  configOptions: any;
  configOptionsDW: ThemeConfig[];
  configOptionsNI: ThemeConfig[];
  dw_areasObj : ThemeConfig[] = [];
  ni_areasObj : ThemeConfig[] = [];
  changeClass : string
  active : boolean = false;
  activefeed : false;
  public Role = Role;


  selectedOptionid = 1
  menuOptions = [{
    id : 'dw',
    name : 'Doing Well'
  },
  {
    id : 'ni',
    name : 'Needs Improvement'
  }]

  chosenMenuOption = this.menuOptions[0]
  maxrating: number;
  minrating: number;
  myselectstlye: string = 'center-select red-background';

  constructor(private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute,
              private zithApiService: ZithapiService,
              private roleService:RoleService,
              private readonly elementRef: ElementRef,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig,
              private confirmationService: ConfirmationService) {
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required])
    });
  }

  ngOnInit(): void {

    document.querySelectorAll('.merchantRatingStatusPanel li').forEach(entry => entry.addEventListener('click', e => {
      if(!entry.classList.contains('active')) {
          document.querySelector('.merchantRatingStatusPanel li.active').classList.remove('active');
          entry.classList.add('active');
      }
      e.preventDefault();
   }));

    this.primengConfig.ripple = true;
    this.parentName = this.route.snapshot.paramMap.get('parent');
    this.childName = this.route.snapshot.paramMap.get('child');
    this.selectedSubMerchant = this.route.snapshot.paramMap.get('merchantUserId');

    this.optionArray = [
      {
        id : 1,
        min : 1,
        max : 2,
        name : '1 & 2',
        icon : 'angry active'
      },
      {
        id : 2,
        min : 3,
        max : 3,
        name : '3',
        icon : 'ok active'
      },
      {
        id : 3,
        min : 4,
        max : 5,
        name : '4 & 5',
        icon : 'happy active'
      }
    ]

    this.selectedOption = this.optionArray[0]

    this.getConfiguration()
  }




  cancel() {
    this.router.navigate(['/zitharamerchants/merchants']);
  }



changeOptions(){

}

showError(message) {

  this.messageService.add({severity:'error', summary:'Error', detail:message});

}


showSuccess(message) {
  this.messageService.add({severity:'success', summary:'Completed', detail:message});
}



// --------------------------------------------------------------
getConfiguration(){


  this.selectedOption = this.optionArray.filter(o => o.id === this.selectedOptionid)[0]


  this.zithApiService.getFeedbackConfig(this.selectedSubMerchant,this.selectedOption['min'],this.selectedOption['max'])
  .subscribe(data => {

    this.activefeed = data.body.active
    this.active =  data.body.active

    this.configOptionsDW = []
    this.configOptionsNI = []

    this.dw_areasObj = []
    this.ni_areasObj = []

try{
    Array.from(data.body.options.dwAreas).forEach( o => {
      var m : ThemeConfig = {
        id : o.toString(),
        name : o.toString()
      }

      this.configOptionsDW.push(m)
    })
     Array.from(data.body.options.niAreas).forEach( o => {
      var m : ThemeConfig = {
        id : o.toString(),
        name : o.toString()
      }
      this.configOptionsNI.push(m)
    })

    Array.from(data.body.data.dwAreas).forEach( o => {
      var m : ThemeConfig = {
        id : o.toString(),
        name : o.toString()
      }

      this.dw_areasObj.push(m)
    })
     Array.from(data.body.data.niAreas).forEach( o => {
      var m : ThemeConfig = {
        id : o.toString(),
        name : o.toString()
      }
      this.ni_areasObj.push(m)
    })

  } catch (error){

  }

      // var chosen = Array.from(data.body.data.dwAreas)
      // this.dw_areasObj = this.configOptionsDW.filter( o => chosen.includes(o.id) )
      // this.configOptionsDW = this.configOptionsDW.filter( o => !chosen.includes(o.id) )


      // chosen = Array.from(data.body.data.niAreas)
      // this.ni_areasObj = this.configOptionsNI.filter( o => chosen.includes(o.id) )
      // this.configOptionsNI = this.configOptionsNI.filter( o => !chosen.includes(o.id) )

    this.showSuccess('Configuration Receieved Succesfully');
  }, error => {

  });
}

getConfigurationOptions(){

  var selectedOptionObject = this.optionArray.filter(o => o['id'] == this.selectedOption)[0]

  console.log(selectedOptionObject, "----XXX---")

  this.zithApiService.getFeedbackConfigOptions(this.selectedSubMerchant)
  .subscribe(data => {

    this.configOptionsDW = []
    this.configOptionsNI = []

    Array.from(data.body.data.dwAreas).forEach( o => {
      var m : ThemeConfig = {
        id : o.toString(),
        name : o.toString()
      }

      this.configOptionsDW.push(m)
    })
     Array.from(data.body.data.niAreas).forEach( o => {
      var m : ThemeConfig = {
        id : o.toString(),
        name : o.toString()
      }
      this.configOptionsNI.push(m)
    })

    this.getConfiguration()
    // this.showSuccess('Configuration Receieved Succesfully');
  }, error => {

  });
}



 // method triggered when form is submitted
 submit(all:boolean) {

  this.selectedOption = this.optionArray.filter(o => o.id === this.selectedOptionid)[0]

  var feedreq : FeedbackConfigAddRequest = {
    dwAreas : this.dw_areasObj.map( o => o.id) ,
    niAreas : this.ni_areasObj.map( o => o.id)
  }

  this.zithApiService.addFeedbackConfig(this.selectedSubMerchant,this.selectedOption['min'],
  this.selectedOption['max'],feedreq,all).subscribe({
    next : data => {

      this.getConfiguration()

    },
    error:error => {

    }
  })

}

unpackconfig(data: Map<Number,Number>){

  this.dataarr = Object.keys(data).map( function(elem) {
    return {
      id : parseInt(elem),
      value : data[parseInt(elem)]*100
    }
  } )

  console.log('now', this.dataarr )

}


applytoAllStore(){
  this.confirmationService.confirm({
    message: 'Are you sure you want to apply this configuration to all other stores?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      let data = this.submit(true)
      // this.submitAll(data)
    }
});
}

changeMenuOption(event:Event){
  console.log(this.chosenMenuOption)

if(this.chosenMenuOption['id'] ==='dw') {
  this.changeClass = 'chiptextdw'

} else {
  this.changeClass = 'chiptextni'
}

}

changeRating(event:Event){
  console.log(event)
  if(event['value'] === 1){
    this.myselectstlye = 'center-select red-background'
  } else if(event['value'] ===2){
    this.myselectstlye = 'center-select orange-background'
  } else {
    this.myselectstlye = 'center-select green-background'
  }

  this.getConfiguration()
}

restrictThemesDW(){
  if(this.dw_areasObj.length > 5){
    var extra :ThemeConfig[] = this.dw_areasObj.slice(5,)
    this.configOptionsDW.push(...extra)
    this.dw_areasObj = this.dw_areasObj.slice(0,5)
  }
}

restrictThemesNI(){
  if(this.ni_areasObj.length > 5){
    var extra :ThemeConfig[] = this.ni_areasObj.slice(5,)
    this.configOptionsNI.push(...extra)
    this.ni_areasObj = this.ni_areasObj.slice(0,5)
  }
}

activateDeactive(event:Event){

  this.zithApiService.activateFeedback(this.selectedSubMerchant,event['checked']).subscribe({
    next: data => {
      this.showSuccess(data.body)
      if(event['checked']){
        this.getConfiguration()
      } else {
        this.active = event['checked']
      }


    },
    error:error => {
      this.showError(error.error)
    }
  })

}

}
