import { Status } from './../../../comman/status.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QueryService } from '../services/query.service';

@Component({
  selector: 'app-update-query-status',
  templateUrl: './update-query-status.component.html',
  styleUrls: ['./update-query-status.component.scss']
})
export class UpdateQueryStatusComponent implements OnInit {

  @Input() editQueryData;
  @Input() assignToData;
  submitted = false;
  updateQueryStatusForm: FormGroup;
  assignToPersonForm: FormGroup;
  public assignToPerson: any[];

  constructor(public _activeModal: NgbActiveModal,
    private formbuilder: FormBuilder,
    private _queryService: QueryService) {
  }

  ngOnInit(): void {
    if (this.editQueryData) {
      this.updateQueryStatusForm = this.formbuilder.group({
        status: ['', [Validators.required]],
        feedback_remark: ['', [Validators.required]],
      });
      this.updateQueryStatusForm.patchValue({
        status: Status[this.editQueryData.status]
      })
    }

    if (this.assignToData) {
      this._queryService.reassignMemberList(this.assignToData._id, {}).subscribe(data => {
        this.assignToPerson = data.data
      })

      this.assignToPersonForm = this.formbuilder.group({
        assigned_to: [, [Validators.required]]
      })
    }
  }

  // return controls of form
  get f() {
    if (this.editQueryData) {
      return this.updateQueryStatusForm.controls;
    }
    if (this.assignToData) {
      return this.assignToPersonForm.controls;
    }
  }

  // close model
  closeModal() {
    this._activeModal.dismiss();
  }

  // update status of query api call when you submit updateQueryStatusForm 
  updateQueryStatusform(data) {
    this.submitted = true
    if (this.updateQueryStatusForm.valid) {
      this._queryService.updateQueryStatus(this.editQueryData._id, data).subscribe((data) => {
        if (data.status == 1) {
          this._activeModal.close()
        }
      })
    }
  }

  // assignToPersonForm when submit that time this function called
  assignToPersonform(data) {
    this.submitted = true;
    if (this.assignToPersonForm.valid) {
      this._queryService.reassignQuery(this.assignToData._id, data).subscribe((data) => {
        if (data.status == 1) {
          this._activeModal.close()
        }
      })
    }
  }

}
