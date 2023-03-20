import { VerticalLayoutComponent } from './layout/vertical/vertical-layout.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [

  

  {
    path:'',
    loadChildren:()=>import('./main/main.module').then(m=>m.MainModule),
    canActivate:[AuthGuard]
  },
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule),
  },


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
