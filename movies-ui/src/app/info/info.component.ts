import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {InfoService} from './info.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  user_id: string;
  dynamic_content: any;
  dynamic_instructions: any;
  selectedRace = null;
  validateForm!: FormGroup;
  instructions: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private infoservice: InfoService) {
    this.route.queryParams.subscribe(params => {
      this.user_id = params['user_id'];
      this.dynamic_content = JSON.parse(params['dynamic_content']);
      this.dynamic_instructions = this.dynamic_content['instructions'];
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.validateForm.valid){
      if (this.validateForm.value['internet'] != '4'){
        this.router.navigate(['/exit']);
      }
      else{
        var date = new Date();
        this.validateForm.value['user_id'] = this.user_id;
        this.validateForm.value['user_entry_time'] = date.toISOString();
        this.infoservice.postInfo(this.validateForm.value).subscribe({
          next: data =>{}
        }); 
        this.instructions = true;
      }
    }
    else{
      console.log(this.validateForm.value);
    }
  }

  confirm(): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "user_id":this.user_id,
        "dynamic_content": JSON.stringify(this.dynamic_content)
      },
      skipLocationChange: true,
    };
    this.router.navigate(['/preconnect'],navigationExtras);
  }

  ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {

    if (control.value !== undefined && (isNaN(control.value) || control.value < 18 || control.value > 80)) {
        return { 'ageRange': true };
    }
    return null;
  }
  ngOnInit(): void {
    window.scroll(0,0);
    this.validateForm = this.fb.group({
      age: [null, [this.ageRangeValidator]],
      internet: [null, [Validators.required]],
      race: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      study: [null, [Validators.required]],
      frequency: [null, [Validators.required]],
      genre: [null, [Validators.required]]
    });
  }

}
