import { UserListService } from "./../services/user-list.service";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { catchError, debounceTime, switchMap } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { NgSelectComponent } from "@ng-select/ng-select";
import { EMPTY } from "rxjs";
import { Department } from "app/comman/Department.enum";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UsersListComponent implements OnInit {
  @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;
  rows: any;
  limit: number = 5;
  ColumnMode = ColumnMode;
  rowCount: number;
  myControl = new FormControl();
  tableOffset = 0;

  selectRole: any = [
    { name: "All", value: "" },
    { name: "ADMIN ", value: "1" },
    { name: "DELIVERY_MANAGER ", value: "2" },
    { name: "ACCOUNTS", value: "3" },
    { name: "HR", value: "4" },
    { name: "PM", value: "5" },
    { name: "TL", value: "6" },
    { name: "USER ", value: "7" },
  ];

   selectStatus: any = [
    { name: "All", value: "" },
    { name: "Active", value: "1" },
    { name: "InActive", value: "2" },
  ];

  selectedRole = [];
  selectedStatus = [];
  searchValue = "";
  apiUpdateVal = "";

  query = {
    user_type: null,
    limit: null,
    page: null,
    search: null,
  };

  constructor(private _userListService: UserListService) {}

  // set the data in ngx-datatable
  setval(data) {
    this.rows = data.data.data;
    this.rows.map((data:any)=>{return[ data.department = Department[data.department]]})
    this.rowCount = data.data.total;
    this.limit = data.data.limit;
  }

  // comman userlist service subscribe
  Userlistcomman(queryParams) {
    this._userListService.userList(queryParams).subscribe((data) => {
      this.setval(data);
    });
  }

  ngOnInit() {
    // for initial data showing
    this.Userlistcomman({ limit: 5 });

    // for search operatiom ans change offset value on search operatopn
    this.myControl.valueChanges
      .pipe(
        debounceTime(1000),
        switchMap((changedValue) =>
          this._userListService.userList({
            search: changedValue,
            limit: this.limit,
            page: 1,
            user_type: this.selectedRole["value"],
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

  // for change page in server side
  datatablePageData(queryParams: { [param: string]: any }, event) {
    queryParams.page = event.offset + 1;
    this.tableOffset = event.offset;
    this.Userlistcomman(queryParams);
  }

  // for set limit od data size
  setlimit(queryParams: { [param: string]: any }) {
    this.Userlistcomman(queryParams);
  }

  filterByRole(event: any) {
    console.log(this.myControl.value);

    this.tableOffset = 0;
    this.query = {
      search: this.myControl.value,
      user_type: event === undefined ? [] : event?.value,
      limit: this.limit,
      page: 1,
    };

    // selectedRole
    this.Userlistcomman(this.query);
  }

  // for sorting data in column
  onSortFile(event) {
    console.log(event.sorts[0].prop, "event");
    console.log(event.newValue, "order");

    if (event) {
      let query = {
        search: this.myControl.value,
        user_type: this.selectRole === undefined ? [] : this.selectRole?.value,
        limit: this.limit,
        page: 1,
        sortBy: event.sorts[0].prop + ":" + event.newValue,
      };

      this.Userlistcomman(query);
    }
  }

  // edit slider

  editUserDetail(id) {
    this.rows.filter((value, index) => {
      if (value._id == id) {
        console.log(value);
        // this.editAdminData=value
        // this._AdminListService.editAdminData.next(this.editAdminData)
      }
    });

    // this.toggleEventSidebar();
  }
}
