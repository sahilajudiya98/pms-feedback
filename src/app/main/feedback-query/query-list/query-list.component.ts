import { UpdateQueryStatusComponent } from './../update-query-status/update-query-status.component';
import { Status } from './../../../comman/status.enum';
import { User_Type } from './../../../comman/User_Type.enum';
import { Department } from './../../../comman/Department.enum';
import { QueryService } from './../services/query.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { EMPTY } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QueryListComponent implements OnInit {
  @ViewChild('tableRowDetails') tableRowDetails: any;
  rows: any;
  limit: number = 5;
  ColumnMode = ColumnMode;
  rowCount: number;
  searchBox = new FormControl();
  tableOffset = 0;
  private editQueryData;

  query = {
    user_type: null,
    limit: null,
    page: null,
    search: null,
  };

  constructor(private _queryservice: QueryService,
    private _modalService: NgbModal) { }

  ngOnInit(): void {
    // for initial data showing
    this.querylistcomman({ limit: 5 });


    // for search operatiom ans change offset value on search operatopn
    this.searchBox.valueChanges
      .pipe(
        debounceTime(1000),
        switchMap((changedValue) =>
          this._queryservice.queryList({
            search: changedValue,
            limit: this.limit,
            page: 1,
          }).pipe(
            // if api get error then mycontrol will be fail so handle api call here 
            catchError((err) => {
              this.rows = []
              return EMPTY;
            })
          )
        )
      )
      .subscribe((data) => {
        this.tableOffset = 0;
        this.setval(data);
      });


  }

  // assign ngx datatable row value
  private setval(data) {
    this.rows = data.data.data;
    this.rows.map((data: any) => {
      return [data.assigned_department = Department[data.assigned_department],
      data.requested_by.user_type = User_Type[data.requested_by.user_type], data.status = Status[data.status]]
    })
    this.rowCount = data.data.total;
    this.limit = data.data.limit;


  }

  // comman userlist service subscribe
  private querylistcomman(queryParams) {
    this._queryservice.queryList(queryParams).subscribe((data) => {
      this.setval(data);
    });
  }


  // for set limit od data size
  setlimit(queryParams: { [param: string]: any }) {
    this.querylistcomman(queryParams);
  }

  // for change page in server side
  datatablePageData(queryParams: { [param: string]: any }, event) {
    queryParams.page = event.offset + 1;
    this.tableOffset = event.offset;
    this.querylistcomman(queryParams);
  }


  // for sorting data in column
  onSortFile(event) {

    if (event) {
      let query = {
        search: this.searchBox.value,
        limit: this.limit,
        page: 1,
        sortBy: event.sorts[0].prop + ":" + event.newValue,
      };

      this.querylistcomman(query);
    }
  }

  // for toggle row expand
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }


  // update  query status
  updateQueryStatus(row) {

    const modalRef = this._modalService.open(UpdateQueryStatusComponent, { backdrop: true, centered: true });
    modalRef.componentInstance.editQueryData = row;
    modalRef.result.then(() => {
      this.querylistcomman({ limit: 5 });
      this.tableOffset = 0;
    }).catch((res) => { });
  }

  // delete query
  deleteQuery(id) {
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
      if (result.isConfirmed) {
        this._queryservice.deleteQuery(id).subscribe((data) => {
          if (data.status == 1) {
            this.rows.filter((value, index) => {
              if (value._id == id) {
                this.rows.splice(index, 1)
              }
            })
          }
        })
      }
    });

  }


}
