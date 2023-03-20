import { QueryService } from './../../services/query.service';
import { FormControl, Validators } from "@angular/forms";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-create-query",
  templateUrl: "./create-query.component.html",
  styleUrls: ["./create-query.component.scss"],
})
export class CreateQueryComponent implements OnInit {
  CreateQueryForm: FormGroup;
  submitted = false;
  

  constructor(
    public _activeModal: NgbActiveModal,
    private formbuilder: FormBuilder,
    private _queryService:QueryService
  ) {}



  ngOnInit(): void {
    this.CreateQueryForm = this.formbuilder.group({
      feedback_title: ["", [Validators.required]],
      feedback_description: ["", [Validators.required]],
      feedback_type: ["", [Validators.required]],
    });
  }
  get f(){
    return this.CreateQueryForm.controls
  }

  // close model
  closeModal() {
    this._activeModal.dismiss();
  }

  // when you submit form this function called
  createQueryform(data: { title: string; description: string }) {
    this.submitted = true;
    if(this.CreateQueryForm.valid){ 
      this._queryService.createQuery(data).subscribe((data)=>{
        if(data.status==1){
          this._activeModal.close();
        }
      })

    }

  }

}
