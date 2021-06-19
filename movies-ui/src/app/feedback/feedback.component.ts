import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  tooltips = ['terrible', 'very bad', 'bad', 'normal', 'good', 'very good' ,'wonderful'];
  validateForm!: FormGroup;
  constructor(private fb: FormBuilder,private router: Router) {}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.router.navigate(['/thanks']);
  }
  
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      race: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      age: [null, [Validators.required]],
      study: [null, [Validators.required]],
      frequency: [null, [Validators.required]],
      genre: [null, [Validators.required]],
      internet: [null, [Validators.required]]
    });
  }
}
