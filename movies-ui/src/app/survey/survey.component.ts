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

  deadline = Date.now() + 1000 * 60 * 3;
  load_button_text: string = 'Load More';
  isLoading: boolean = false;
  time_choice: boolean = true;        //Show milliseconds if true
  movies: any[];                      //Movies fetched from Backend
  titles: any[] = [];                 //Titles of movies fetched
  names: any[] = [];                  //Names fetched from Backend
  size: NzButtonSize = 'large';       //Submit button size
  isVisible: boolean = false;         //Review modal flag
  review_index: number;               //Which movie review is clicked
  review_heading: string;             //Heading when Read review is clicked
  movies_selected: any = {};          //Flag for add or remove 
  movies_count: number = 0;           //Count of how many movies are selected
  movies_order: any[] = [];           //Order in which movies are fetched
  movies_index: number = 0;           //From which index to fetch next 3 movies
  total_movies: number = 0;           //Total movies available in Database
  names_order: any[] = [];           //Order in which names are fetched
  names_index: number = 0;           //From which index to fetch next 3 names
  total_names: number = 0;           //Total first names available in Database
  movies_reviewed: any = {};         //Number of times a movie review is read
  user_id: string;

  review(i): void {
    if (this.movies_reviewed[i] != null) {
      this.movies_reviewed[i] = this.movies_reviewed[i]+1;
    }
    else{
      this.movies_reviewed[i] = 1;
    }
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
      this.user_id = params['user_id'];
      if (params['time_choice'] == "true"){
        this.time_choice = true;
      }
      else{ 
        this.time_choice = false;
      }
    });
  }

  timeup() {
    var survey_data: any = {};
      survey_data['user_id'] = this.user_id;
      survey_data['movie_data'] = this.movies.slice(0, this.movies_index);
      survey_data['movies_reviewed'] = this.movies_reviewed;
      survey_data['time_choice'] = this.time_choice;
      survey_data['name_data'] = this.names.slice(0, this.names_index);
      survey_data['movies_selected'] = this.movies_selected;
      var date = new Date();
      survey_data['timestamp'] = date.toISOString();
      console.log(survey_data);
    this.surveyService.postSurveyData(survey_data).subscribe({
      next: data =>{}
    }); 
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "user_id":this.user_id,
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
    this.load_button_text = 'Loading'
    this.isLoading = true;
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
    this.names_index += 3;
    this.isLoading = false;
    this.load_button_text = 'Load More';
  }
  submit() {
    console.log(this.movies_selected);
    if (this.movies_count < 2){
      const modal = this.modalService.warning({
        nzTitle: 'You have not selected 2 movies, please select atleast 2 movies to Submit',
        nzContent: ''
      });
    }
    else{
      var survey_data: any = {};
      survey_data['user_id'] = this.user_id;
      survey_data['movie_data'] = this.movies.slice(0, this.movies_index);
      survey_data['movies_reviewed'] = this.movies_reviewed;
      survey_data['time_choice'] = this.time_choice;
      survey_data['name_data'] = this.names.slice(0, this.names_index);
      survey_data['movies_selected'] = this.movies_selected;
      var date = new Date();
      survey_data['timestamp'] = date.toISOString();
      console.log(survey_data);
      this.surveyService.postSurveyData(survey_data).subscribe({
        next: data =>{}
      }); 
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "time_choice":this.time_choice,
          "user_id":this.user_id,
        },
        skipLocationChange: true,
      };
      this.router.navigate(['/feedback'],navigationExtras);
    }
  }
  ngOnInit(): void {
    this.surveyService.getMoviesCount().subscribe({
      next: data =>{
        this.total_movies = data;
        while(this.movies_order.length < this.total_movies){
          var r = Math.floor(Math.random() * this.total_movies) + 1;
          if(this.movies_order.indexOf(r) === -1) this.movies_order.push(r);
        }
        var ind = this.movies_index;
        this.surveyService.getMovies([this.movies_order[ind],this.movies_order[ind+1],this.movies_order[ind+2]]).subscribe({
          next: data =>{
          this.movies = data;
          }
        }); 
        this.movies_index += 3;
      }
    }); 
    this.surveyService.getFnamescount().subscribe({
      next: data =>{
        this.total_names = data;
        while(this.names_order.length < this.total_names){
          var r = Math.floor(Math.random() * this.total_names) + 1;
          if(this.names_order.indexOf(r) === -1) this.names_order.push(r);
        }
        var ind = this.names_index;
        this.surveyService.getNames([this.names_order[ind],this.names_order[ind+1],this.names_order[ind+2]]).subscribe({
          next: data =>{
          this.names = data;
          }
        }); 
        this.names_index += 3;
      }
    }); 
  }
}
