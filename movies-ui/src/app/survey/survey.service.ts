import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }
  // base_url: string = 'http://localhost:8000/'
  base_url: string = 'http://34.239.255.245/'

  postSurveyData(data: any): Observable<any> {
    let url = this.base_url +'postsurvey/';
    const headers = { 'Content-Type': 'text/plain' };
    return this.http.post<any[]>(url, data ,{ headers }).pipe(
      tap(response => {}));
  }

  getMoviesCount(): Observable<any> {
    let url = this.base_url +'getmoviescount/';
    return this.http.get<any[]>(url).pipe(
      tap(response => {}));
  }
  getFnamescount(): Observable<any> {
    let url = this.base_url +'getfnamescount/';
    return this.http.get<any[]>(url).pipe(
      tap(response => {}));
  }
  getMovies(initial_movies: any[]): Observable<any> {
    let url = this.base_url +'getmovies/';
    const headers = { 'Content-Type': 'text/plain' };
    return this.http.post<any[]>(url, initial_movies , {headers}).pipe(
      tap(data => {}));
  }
  getNames(names: any[]): Observable<any> {
    let url = this.base_url +'getnames/';
    const headers = { 'Content-Type': 'text/plain' };
    return this.http.post<any[]>(url, names , {headers}).pipe(
      tap(data => {}));
  }
}
