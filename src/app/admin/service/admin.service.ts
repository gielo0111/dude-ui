import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { IssueModel } from '../model/IssueModel';

const httpOptions = {
  headers: new HttpHeaders({
  })
};

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(
    private router: Router,
    private http:HttpClient) { }

  baseUrl: string = 'http://localhost:8082';


  createIssue(issue: IssueModel) {
    return this.http.post<IssueModel>(`${this.baseUrl}/reports`, issue, httpOptions);
  }

  searchAllIssues() {
    return this.http.get<IssueModel[]>(`${this.baseUrl}/reports?createdBy=admin2`)
    .pipe(
      catchError(this.handleError)
    );
  }

  searchIssues(page: String, size: String) {
    return this.http.get<IssueModel[]>(`${this.baseUrl}/reports?createdBy=admin2&page=${page}&size=${size}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  
}
