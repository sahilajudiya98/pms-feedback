import { NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';

import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { ContentModule } from 'app/layout/components/content/content.module';
import { MenuModule } from 'app/layout/components/menu/menu.module';
import { FooterModule } from 'app/layout/components/footer/footer.module';

import { VerticalLayoutComponent } from 'app/layout/vertical/vertical-layout.component';

@NgModule({
  declarations: [VerticalLayoutComponent],
  imports: [RouterModule, CoreCommonModule, CoreSidebarModule, NavbarModule, MenuModule, ContentModule, FooterModule],
  exports: [VerticalLayoutComponent]
})
export class VerticalLayoutModule implements OnInit{
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("vertical load");
    
  }
}
