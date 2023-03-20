import { Role } from 'app/auth/models';
import { HelperService } from './../../../auth/service/helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private helperService:HelperService) { 

  }

  ngOnInit(): void {
    // console.log(this.helperService.currentUser().role)
  }

}
