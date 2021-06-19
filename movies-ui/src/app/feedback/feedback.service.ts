import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  base_url: string = 'http://localhost:8000/';
  constructor(private http: HttpClient) { }
  postFeedbackData(data: any): Observable<any> {
    let url = this.base_url +'postfeedback/';
    const headers = { 'Content-Type': 'text/plain' };
    return this.http.post<any[]>(url, data ,{ headers }).pipe(
      tap(response => {}));
  }
}
