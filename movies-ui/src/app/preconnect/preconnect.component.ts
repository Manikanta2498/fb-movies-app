import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PreconnectService } from './preconnect.service';

@Component({
  selector: 'app-preconnect',
  templateUrl: './preconnect.component.html',
  styleUrls: ['./preconnect.component.css']
})
export class PreconnectComponent implements OnInit {

  dynamic_content: any;
  preconnect1: any;
  preconnect2: any;
  user_id: string;
  time_choice: boolean;
  constructor(private router: Router,private route: ActivatedRoute,private preconnectService: PreconnectService) {
    this.route.queryParams.subscribe(params => {
      this.user_id = params['user_id'];
      this.time_choice = params['time_choice'];
      this.dynamic_content = JSON.parse(params['dynamic_content']);
      this.preconnect1 = this.dynamic_content['preconnect1'];
      this.preconnect2 = this.dynamic_content['preconnect2'];
    });
  }

  confirm(): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "user_id":this.user_id,
        "time_choice":this.time_choice,
      },
      skipLocationChange: true,
    };
    this.router.navigate(['/survey'],navigationExtras);
  }

  ngOnInit(): void {
  }

}
