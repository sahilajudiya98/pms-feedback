
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from "../../layout/components/content-header/content-header.module";
import { CardSnippetModule } from "../../../@core/components/card-snippet/card-snippet.module";
import { NgSelectModule } from '@ng-select/ng-select';
import { SliderComponent } from './slider/slider.component';
import { AddSliderComponent } from './slider/add-slider/add-slider.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { CreateAdminComponent } from './admin-list/create-admin/create-admin.component';
import { CoreSidebarModule } from "../../../@core/components/core-sidebar/core-sidebar.module";






@NgModule({
    declarations: [
        UsersListComponent,
        SliderComponent,
        AddSliderComponent,
        AdminListComponent,
        CreateAdminComponent,
    ],
    imports: [
        AdminRoutingModule,
        NgxDatatableModule,
        ContentHeaderModule,
        CardSnippetModule,
        SharedModule,
        NgSelectModule,
        CoreSidebarModule,

    ]
})
export class AdminModule { }
