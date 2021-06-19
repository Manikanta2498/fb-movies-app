import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {ThanksService} from './thanks.service';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css'],
  providers: [NzNotificationService]
})
export class ThanksComponent implements OnInit {
  user_id: string;
  code: string;
  constructor(private notification: NzNotificationService,
              private thanks_service: ThanksService,
              private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.user_id = params['user_id'];
    });
  }

  movie(): void {
    this.thanks_service.postMovieLink({"user_id": this.user_id}).subscribe({
      next: data =>{}
    }); 
  }

  ngOnInit(): void {
    this.thanks_service.getDynamics().subscribe({
      next: data => {
        this.code = data['thankyou_code'];
      }
    })
  }
  copyText(){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.code;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.notification.create('success','Code Copied!','',{ nzDuration: 2000 });
  }

}
