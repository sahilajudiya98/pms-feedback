import { Breadcrumb } from 'app/layout/components/content-header/breadcrumb/breadcrumb.component';
import { Component, OnInit, Input } from '@angular/core';

// ContentHeader component interface
export interface ContentHeader {
  headerTitle: string;
  actionButton: boolean;
  breadcrumb?: Breadcrumb;
}

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html'
})
export class ContentHeaderComponent implements OnInit {
  // input variable
  @Input() contentHeader: ContentHeader;

  constructor() {}

  ngOnInit() {}
}
