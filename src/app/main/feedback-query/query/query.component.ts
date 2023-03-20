import { QueryService } from './../services/query.service';
import { CreateQueryComponent } from './create-query/create-query.component';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QueryComponent implements OnInit {
  @ViewChild('tableRowDetails') tableRowDetails: any;
  rows: any;
  limit: number = 5;
  ColumnMode = ColumnMode;
  rowCount: number;
  searchBox = new FormControl();
  tableOffset = 0;

  private query = {
    user_type: null,
    limit: null,
    page: null,
    search: null,
  };

  constructor(private _modalService: NgbModal,
    private _queryservice: QueryService) { }

  ngOnInit(): void {
    // for initial data showing
    this.querylistUsercomman({ limit: 5 });

    // for search operatiom ans change offset value on search operatopn
    this.searchBox.valueChanges
      .pipe(
        debounceTime(1000),
        switchMap((changedValue) =>
          this._queryservice.queryListUser({
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
    this.rowCount = data.data.total;
    this.limit = data.data.limit;
  }

  // comman userlist service subscribe
  querylistUsercomman(queryParams) {
    this._queryservice.queryListUser(queryParams).subscribe((data) => {
      // console.log(data.data.data)
      this.setval(data);
    });
  }


  // for change page in server side
  datatablePageData(queryParams: { [param: string]: any }, event) {
    queryParams.page = event.offset + 1;
    this.tableOffset = event.offset;
    this.querylistUsercomman(queryParams);
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

      this.querylistUsercomman(query);
    }
  }

  // for toggle row expand
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }
  // for set limit od data size
  setlimit(queryParams: { [param: string]: any }) {
    this.querylistUsercomman(queryParams);
  }


  modalOpenBD() {
    const modalRef = this._modalService.open(CreateQueryComponent, { backdrop: true, centered: true });
    modalRef.result.then(() => {
      this.querylistUsercomman({ limit: 5 });
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
