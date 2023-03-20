

import { AddSliderComponent } from './add-slider/add-slider.component';
  import { SliderService } from './../services/slider.service';
  import { Component, OnInit, ViewEncapsulation } from '@angular/core';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { ColumnMode } from '@swimlane/ngx-datatable';
  import Swal from 'sweetalert2';

  @Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    encapsulation:ViewEncapsulation.None,


  })
  export class SliderComponent implements OnInit {



  public rows: any;
  public limit: number = 5;
  public ColumnMode = ColumnMode;
  public rowCount :number;
  public tableOffset=0;
  editSliderData;

  public selectStatus: any = [
    { name: 'All', value: '' },
    { name: 'Active', value: true },
    // { name: 'InActive', value: false }
  ]

  public selectedStatus = [];



    constructor(private _modalService: NgbModal,
      private _sliderService:SliderService,
   ) { }


    ngOnInit(): void {
  // set  data
      this.CommanApi({})

    }

  
  // comman api call for all
    CommanApi(param){
      this._sliderService.getSlider(param).subscribe((data)=>{
        this.rows = data.data

      })
    }


    
    // modal Open Backdrop Disabled
    addSlider() {
      const modalRef = this._modalService.open(AddSliderComponent, {backdrop: false,centered: true });
      modalRef.result.then((  ) => {
        this.CommanApi({})
      }).catch((res) => {});
    }

    // for reset off set table offset value to gllobal var 
    datatablePageData(event){
      this.tableOffset = event.offset 
      }
      // filter by status
      filterByStatus(event: any) {
        this.tableOffset=0    
          let query = {
            isActive: event != undefined ? event?.value : event
          }
    
          this.CommanApi(query)
      }



// delete slider
      
deleteSlider(id) {
    
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
        this._sliderService.deleteSlider(id).subscribe((data)=>{
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

  editSlider(id){
    this.rows.filter((value, index)=>{
      if(value._id==id){
        this.editSliderData=value
      }
    })
    const modalRef = this._modalService.open(AddSliderComponent, { size: 'lg',backdrop: false,centered: true });
    modalRef.componentInstance.editSliderData = this.editSliderData;
    modalRef.result.then((  ) => {
      this.CommanApi({})
    }).catch((res) => {});
  }

  

  }
