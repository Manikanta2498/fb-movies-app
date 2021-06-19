import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-preconnect',
  templateUrl: './preconnect.component.html',
  styleUrls: ['./preconnect.component.css']
})
export class PreconnectComponent implements OnInit {

  dynamic_content: any;
  preconnect1: any;
  preconnect2: any;
  form: any;
  time_choice: boolean;
  constructor(private router: Router,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.form = JSON.parse(params['form']);
      this.dynamic_content = JSON.parse(params['dynamic_content']);
      this.preconnect1 = this.dynamic_content['preconnect1'];
      this.preconnect2 = this.dynamic_content['preconnect2'];
    });
  }

  confirm(): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "form":JSON.stringify(this.form),
        "time_choice":this.time_choice,
        "dynamic_content": JSON.stringify(this.dynamic_content),
      },
      skipLocationChange: true,
    };
    this.router.navigate(['/survey'],navigationExtras);
  }

  @HostListener('window:beforeunload', ['$event'])
   onWindowClose(event: any): void {
    // Do something

     event.preventDefault();
     event.returnValue = false;

  }

  ngOnInit(): void {
    this.time_choice = Math.random() >= 0.5;
  }

}
