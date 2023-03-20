import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AdminListService } from '../services/admin-list.service';    
import { FormControl } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { NgSelectComponent } from '@ng-select/ng-select';
import { debounceTime, switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AdminListComponent implements OnInit {


  @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;
public rows: any;
public length: number =10;
public ColumnMode = ColumnMode;
public rowCount :number;
public myControl = new FormControl()
public tableOffset=0;
editAdminData;


public searchValue = '';

 query = {
  user_type : null,
  length: null ,
  page: null,
  filter: null,
  search:null
}


constructor(private _adminListService:AdminListService,
  private _coreSidebarService:CoreSidebarService){
}


// set the data in ngx-datatable
setVal(data){
  this.rows = data.data.adminList
    this.rowCount =  data.data.adminUsersCount
    
}

// comman userlist service subscribe
adminListComman(queryParams){
  this._adminListService.adminList(queryParams).subscribe((data)=>{
    this.setVal(data)
  })
}

ngOnInit() {

  this._adminListService.refreshdata.subscribe((data)=>{
    if(data==true){
      this.adminListComman({'page':this.tableOffset+1})
    }
  })

  // for initial data showing
    this.adminListComman({})

// for search operatiom ans change offset value on search operatopn
this.myControl.valueChanges.pipe(
  debounceTime(1000),
  switchMap(changedValue => this._adminListService.adminList({'search':changedValue,'length':this.length,'page':1})),
).subscribe((data)=>{
  this.tableOffset=0
  this.setVal(data)
});
}

// for change page in server side 
datatablePageData(queryParams: { [param: string]: any },event){
queryParams.page=event.offset+1
this.tableOffset = event.offset
  this.adminListComman(queryParams)


}


// for set length od data size
setLength(queryParams: { [param: string]: any }){
    this.adminListComman(queryParams)
    this.tableOffset=0
  
}


// delete slider
      
deleteAdmin(id) {
    
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#7367F0',
    cancelButtonColor: '#E42728',
    confirmButtonText: 'Yes, delete it!',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger ml-1'
    }

  }).then((result) => {
    if(result.isConfirmed){
      this._adminListService.deleteAdmin(id).subscribe((data)=>{
        if(data.status==1){
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          })
          this.rows.filter((value, index)=>{
            if(value._id==id){
              this.rows.splice(index,1)
            }
          })          
        }        
      })
    }
  });
}



// edit slider

editAdmin(id){
  this.rows.filter((value, index)=>{
    if(value._id==id){
      this.editAdminData=value
      this._adminListService.editAdminData.next(this.editAdminData)
    }
  })


  this.toggleEventSidebar();

}
addNewRecord(): void {
  this._adminListService.editAdminData.next({})
  this.toggleEventSidebar();

}

toggleEventSidebar(): void {
  this._coreSidebarService.getSidebarRegistry('user-create-sidebar').toggleOpen();
}
 

}
