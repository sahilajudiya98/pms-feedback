import { AssignQueryListComponent } from './assign-query-list/assign-query-list.component';
import { query } from '@angular/animations';
import { QueryComponent } from './query/query.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryListComponent } from './query-list/query-list.component';
import { PermissionGuard } from 'app/guard/permission.guard';


const routes: Routes = [
  {
    path:'query',
    component:QueryComponent
  },
  {
    path:'query-list',
    component:QueryListComponent
  },
  {
    path:'assign-query-list',
    component:AssignQueryListComponent,
    canActivate:[PermissionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackQueryRoutingModule { }
