import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import {SurveyService} from './survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  info_form: any;
  deadline = Date.now() + 1000 * 60 * 3;
  loading: boolean = false;
  time_choice: boolean = true;        //Show milliseconds if true
  movies: any[];                      //Movies fetched from Backend
  titles: any[] = [];                 //Titles of movies fetched
  names: any[] = [];                  //Names fetched from Backend
  size: NzButtonSize = 'large';       //Submit button size
  isVisible: boolean = false;         //Review modal flag
  review_index: number;               //Which movie review is clicked
  review_heading: string;             //Heading when Read review is clicked
  movies_selected: any = {0:false,1:false, 2:false};    //Flag for add or remove 
  movies_count: number = 0;           //Count of how many movies are selected
  movies_order: any[] = [];           //Order in which movies are fetched
  movies_index: number = 0;           //From which index to fetch next 3 movies and names
  review(i): void {
    console.log(i);
    this.isVisible = true;
    this.review_index = i;
    this.review_heading = this.names[this.review_index]['fname']+' '+this.names[this.review_index]['lname']+"'s review of "+this.movies[this.review_index]['title'];
  }
  add(i): void {
    if (this.movies_count == 2){
      const modal = this.modalService.warning({
        nzTitle: 'You have already selected 2 movies, remove a selection or Submit',
        nzContent: ''
      });
    }
    else{
      this.movies_selected[i] = !this.movies_selected[i];
      this.movies_count++;
    }
  }
  remove(i): void {
    this.movies_selected[i] = !this.movies_selected[i];
    this.movies_count--;
  }

  handleOk(): void {
    this.isVisible = false;
  }
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private modalService: NzModalService,
              private surveyService: SurveyService,
              private zone: NgZone) { 
    this.route.queryParams.subscribe(params => {
      this.info_form = JSON.parse(params['form']);
      if (params['time_choice'] == "true"){
        this.time_choice = true;
      }
      else{ 
        this.time_choice = false;
      }
    });
  }

  timeup() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "form":JSON.stringify(this.info_form),
        "time_choice":this.time_choice,
      },
      skipLocationChange: true,
    };
    const modal = this.modalService.info({
      nzTitle: 'Time Up',
      nzContent: ''
    });
    this.zone.run(() => {
      this.router.navigate(['/feedback'],navigationExtras);
    });
  }
  loadMore(){
    for (var movie in this.movies){
      this.titles.push(this.movies[movie]['title']);
    }
    var ind = this.movies_index;
    this.surveyService.getMovies([this.movies_order[ind],this.movies_order[ind+1],this.movies_order[ind+2]]).subscribe({
      next: data =>{
       for(var i=0;i<3;i++){
        this.movies.push(data[i]);
       }
      }
    }); 
    this.surveyService.getNames([this.movies_order[ind],this.movies_order[ind+1],this.movies_order[ind+2]]).subscribe({
      next: data =>{
       for(var i=0;i<3;i++){
        this.names.push(data[i]);
       }
      }
    }); 
    this.movies_index += 3;
  }
  submit() {
    console.log(this.movies_selected);
    if (this.movies_count < 2){
      const modal = this.modalService.warning({
        nzTitle: 'You have not selected 2 movies, please select atleast 2 movies to Submit',
        nzContent: ''
      });
    }
  }
  ngOnInit(): void {
    while(this.movies_order.length < 68){
      var r = Math.floor(Math.random() * 68) + 1;
      if(this.movies_order.indexOf(r) === -1) this.movies_order.push(r);
    }
    console.log(this.movies_order);
    var ind = this.movies_index;
    this.surveyService.getMovies([this.movies_order[ind],this.movies_order[ind+1],this.movies_order[ind+2]]).subscribe({
      next: data =>{
       this.movies = data;
      }
    }); 
    this.surveyService.getNames([this.movies_order[ind],this.movies_order[ind+1],this.movies_order[ind+2]]).subscribe({
      next: data =>{
       this.names = data;
      }
    }); 
    this.movies_index += 3;
  }

}
