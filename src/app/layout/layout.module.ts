
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomBreakPointsProvider } from 'app/layout/custom-breakpoints';
import { VerticalLayoutModule } from 'app/layout/vertical/vertical-layout.module';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  imports: [FlexLayoutModule.withConfig({ disableDefaultBps: true }), VerticalLayoutModule,
  LayoutRoutingModule],
  providers: [CustomBreakPointsProvider],
  exports: [VerticalLayoutModule]
})
export class LayoutModule {}