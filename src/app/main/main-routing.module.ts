import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
  path:'',
  redirectTo:'dashboard',
  pathMatch:'full'
 },

  {
    path:'dashboard',
    loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
  },

  {
    path:'Admin',
    loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
  },

  {
    path:'feedback-query',
    loadChildren:()=>import('./feedback-query/feedback-query.module').then(m=>m.FeedbackQueryModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
