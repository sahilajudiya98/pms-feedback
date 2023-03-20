import { CreateQueryComponent } from './query/create-query/create-query.component'
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { FeedbackQueryRoutingModule } from './feedback-query-routing.module';
import { QueryComponent } from './query/query.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { QueryListComponent } from './query-list/query-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UpdateQueryStatusComponent } from './update-query-status/update-query-status.component';
import { AssignQueryListComponent } from './assign-query-list/assign-query-list.component';



@NgModule({
  declarations: [
    QueryComponent,
    CreateQueryComponent,
    QueryListComponent,
    UpdateQueryStatusComponent,
    AssignQueryListComponent
  ],
  imports: [
    FeedbackQueryRoutingModule,
    SharedModule,
    NgxDatatableModule,
    NgSelectModule,
  ]
})
export class FeedbackQueryModule { }
