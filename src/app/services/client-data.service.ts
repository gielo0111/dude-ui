import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { ICreatedIssue } from '../client/client-form/created-issue';
import { IReportedIssue } from '../client/client-form/reported-issue';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {

  private baseUrl: string = 'http://localhost:8082';

  constructor(private http:HttpClient) { }

  postClientForm(issue: IReportedIssue): Observable<ICreatedIssue> {
      return this.http.post<ICreatedIssue>(`${this.baseUrl}/issues`,issue,httpOptions).pipe(
        catchError(this.handleError<ICreatedIssue>('createIssue'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
