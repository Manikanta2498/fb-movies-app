import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  base_url: string = 'http://localhost:8000/'
  getUserID(): Observable<any> {
    let url = this.base_url +'getuserid/';
    return this.http.get<any[]>(url).pipe(
      tap(response => {}));
  }
  getDynamics(): Observable<any> {
    let url = this.base_url +'getdynamics/';
    return this.http.get<any[]>(url).pipe(
      tap(response => {}));
  }
}
