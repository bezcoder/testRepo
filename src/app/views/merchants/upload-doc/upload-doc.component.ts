import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig, LazyLoadEvent, MessageService } from 'primeng/api';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Role } from '../../../model/roles';
import { RoleService } from '../../../services/role.service';
import { ZithapiService } from '../../../shared/services/zithapi.service';

@Component({
  selector: 'app-upload-doc',
  templateUrl: './upload-doc.component.html',
  styleUrls: ['./upload-doc.component.scss']
})
export class UploadDocComponent implements OnInit {



  public merchantsData: any;
  public selectedMerchants: any;
  public showuploaderbool:boolean = false


  public Role = Role;
  uploadedFiles: any[] = [];
  smallscreen: boolean;
  showtable: boolean;
  filesdata


  constructor(private formbuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private zithApiService: ZithapiService,
              private roleService: RoleService,
              private breakpointObserver: BreakpointObserver,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig) {
  }

  ngOnInit(): void {

    if (!(this.roleService.hasRoleV2([Role.SuperUser]))){
      this.router.navigate(['/']);
      }




  this.getAllParMerchants();



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


  getAllParMerchants(): void{
    this.zithApiService.getPrimaryMerchants()
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(data => {
      this.merchantsData = data.body.data;
      this.selectedMerchants = this.route.snapshot.paramMap.get('parentid');
      this.getUploadDocInfo();


    }, error => {

    });
  }

  showSuccess(message) {
    this.toastr.success(message);
  }

  showError(message) {
    this.toastr.error(message);
  }


  getUploadDocInfo() {

    console.log('selected-->', this.selectedMerchants)
    this.zithApiService.getDocuments(this.selectedMerchants).subscribe((val) => {
      console.log(val)
      this.filesdata = val
      this.showtable = true
    })
  }

  onUpload(event) {


    this.showSuccess("File Uploaded")
}

uploadDoc(event:Event){
  // console.log(event)
  for(let file of event['files']) {
    this.uploadedFiles.push(file);
}

const formData = new FormData();
formData.append(this.uploadedFiles[0].name,this.uploadedFiles[0].value)

this.zithApiService.uploadDocument(this.selectedMerchants,'aadhaar','',formData).subscribe(val =>{

  this.showSuccess(val)

})



}



  @HostListener('click',["$event.target"])
  onClick(value) {



try{
    let j = 0;
    let el = value.parentNode
    while(j<10){

      if(el.id ===''){
        el = el.parentNode
      } else {
        break
      }
      j = j + 1
    }

  } catch {
  let a = 1
}


  }


  extractfilename(inpt:string){
    console.log(inpt.split("/"))
   return (inpt.split("/")).slice(-1)[0]
  }

  showuploader(){
    this.showuploaderbool = !this.showuploaderbool
  }

}
