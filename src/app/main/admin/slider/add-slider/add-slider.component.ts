import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SliderService } from '../../services/slider.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { file_type_checker } from 'app/shared/validators/file_type_checker';

@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
  styleUrls: ['./add-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddSliderComponent implements OnInit {
  sliderform: FormGroup
  submitted: boolean = false;
  isimageshow = false
  editimage;
  @Input() editSliderData
  modal = this._modalService.dismissAll()
  url: any;


  constructor(private _modalService: NgbModal,
    private _sliderService: SliderService,
    public _activeModal: NgbActiveModal) {
  }

  get f() {
    return this.sliderform.controls;
  }

  // comman api call for all


  ngOnInit(): void {
    this.sliderform = new FormGroup({
      title: new FormControl('', Validators.required),
      slider_image: new FormControl('', [Validators.required, file_type_checker]),
      status: new FormControl(''),

    })


    // console.log(this.editSliderData.status==1?true:false,"ll")
    if (this.editSliderData) {
      this.editimage = this.editSliderData.slider_image
      this.isimageshow = true
      this.sliderform.patchValue({
        title: this.editSliderData.title,
        status: this.editSliderData.status == 1 ? true : false
      });
    }



  }

  private formdata: FormData;
  sliderForm(data) {
    this.submitted = true;
    this.formdata = new FormData();

    this.formdata.append('title', data.title);
    if (data.slider_image !== "") {
      this.formdata.append('slider_image', data.slider_image);
    }
    this.formdata.append('status', data.status == true ? '1' : '2');


    if (this.editSliderData) {
      this.removeValidator()
      if (this.sliderform.status == "VALID") {
        this._sliderService.editSlider(this.editSliderData._id, this.formdata).subscribe((data) => {
          if (data.status == 1) {
            this._activeModal.close();
          }
        })
      }
    }
    else {
      if (this.sliderform.status == "VALID") {
        this._sliderService.inserSlider(this.formdata).subscribe((data) => {
          if (data.status == 1) {
            this._activeModal.close();
          }
        })

      }
    }
  }


  // for check we insert image or not
  selectedImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.sliderform.patchValue({
        slider_image: file
      });
    }


    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
      this.isimageshow = false
    }
  }

  // for dismiss current open modal
  closeModal() {
    this._activeModal.dismiss()

  }

  // when edit image that time remove slider_image validators
  removeValidator() {
    this.sliderform.get('slider_image').clearValidators();
    this.sliderform.get('slider_image').updateValueAndValidity();
  }

}
