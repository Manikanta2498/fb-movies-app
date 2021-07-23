import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {NavigationExtras, Router} from "@angular/router";
import {HomeService} from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NzNotificationService]
})
export class HomeComponent implements OnInit {

  user_ipAddress: string;
  user_id: string;
  dynamic_content: any;
  consent_page: boolean = true;
  checkbox_checked: boolean = false;
  constructor(private homeService: HomeService,
              private notification: NzNotificationService,
              private router: Router) { }

  instructions(){
    let navigationExtras: NavigationExtras = {
      queryParams: {"user_id":this.user_id,"dynamic_content": JSON.stringify(this.dynamic_content)},
      skipLocationChange: true,
    };
    this.router.navigate(['/info'],navigationExtras);
  }
  ngOnInit(){
    this.router.navigateByUrl('', { skipLocationChange: true });
    this.homeService.getUserID().subscribe({
      next: data => {
        this.user_id = data;
      }
    });
    this.homeService.getDynamics().subscribe({
      next: data => {
        this.dynamic_content = data;
      }
    }); 
  }

}
