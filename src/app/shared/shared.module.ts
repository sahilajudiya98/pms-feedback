import { CoreCommonModule } from './../../@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
     FormsModule,
     ReactiveFormsModule,
     NgbModule,
     CoreCommonModule
  ],
  exports:[ReactiveFormsModule,CommonModule,FormsModule,CoreCommonModule]
})
export class SharedModule { }
