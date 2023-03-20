import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { matchPassword } from 'app/shared/validators/password_match';
import { strong_password } from 'app/shared/validators/strong_password';
import { AdminListService } from '../../services/admin-list.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit {
  creatadminForm:FormGroup;
  submitted = false;
  editAdminData
  IsFieldshow = true

  constructor(private formBuilder: FormBuilder,
    private _adminListService:AdminListService,
    private _coreSidebarService: CoreSidebarService) {

    this.creatadminForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['', [Validators.required,strong_password,Validators.minLength(8)]],
      confirm_password: ['', [Validators.required]],
      company: ['', [Validators.required]],
      user_type:['null',[Validators.required]],
    },{ validator: matchPassword('password', 'confirm_password') })
   }

   get f() {
    return this.creatadminForm.controls;
  }
  ngOnInit(): void {
    this._adminListService.editAdminData.subscribe((data)=>{
      this.editAdminData= data
      if(Object.keys(data).length>0){
        this.IsFieldshow = false
        this.creatadminForm.patchValue({
          first_name: this.editAdminData.first_name,
          last_name: this.editAdminData.last_name,
          email:this.editAdminData.email,
          company: this.editAdminData.company,
        })
      }
      else{
        this.creatadminForm.addControl('password', new FormControl('', [Validators.required, strong_password, Validators.minLength(8)]));
        this.creatadminForm.addControl('confirm_password', new FormControl('', Validators.required));
        this.creatadminForm.addControl('user_type', new FormControl('', Validators.required));
        this.creatadminForm.reset();
        this.IsFieldshow = true;
      }
    })
  }


  cereateAdminform(data){
    this.submitted = true;
      this.creatadminForm.removeControl('password');
      this.creatadminForm.removeControl('confirm_password');
      this.creatadminForm.removeControl('user_type');
    if( Object.keys(this.editAdminData).length>0){
      if(this.creatadminForm.status=="VALID"){
       this._adminListService.editAdmin(this.editAdminData._id,this.creatadminForm.value).subscribe((data)=>{
        if(data.status==1){
        this.closeSidebar()
        this._adminListService.refreshdata.next(true)
        }
       })

      }
    }
    else{
    if(this.creatadminForm.status=="VALID"){
      this._adminListService.createAdmin(data).subscribe((data)=>{
        if(data.status==1){
         this.closeSidebar()
         this.creatadminForm.reset()
         this.submitted = false;
         this._adminListService.refreshdata.next(true)
        }
      })
    }
  }
  }

  closeSidebar() {
    this.creatadminForm.reset()
    this.submitted = false;
    this.IsFieldshow = true;
    this._coreSidebarService.getSidebarRegistry('user-create-sidebar').toggleOpen();
  }
}
