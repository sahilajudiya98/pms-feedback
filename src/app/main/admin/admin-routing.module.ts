import { AdminListComponent } from './admin-list/admin-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {
    path:'users-list',
    component:UsersListComponent
  },
  {
    path:'slider',
    component:SliderComponent
  },

  {
    path:'admin-list',
    component:AdminListComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
