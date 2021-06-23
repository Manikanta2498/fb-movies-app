import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  // base_url: string = 'http://localhost:8000/'
  base_url: string = 'http://34.239.255.245/'
  constructor(private http: HttpClient) { }
  postInfo(data: any): Observable<any> {
    let url = this.base_url +'postuserinfo/';
    const headers = { 'Content-Type': 'text/plain' };
    return this.http.post<any[]>(url, data ,{ headers }).pipe(
      tap(response => {}));
  }
}
