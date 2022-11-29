import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  credentials: { username:string, password:string, loginpath:string, token:string}[] = []
  baseUrl: string = 'http://localhost:9000';

  constructor(
    private router: Router,
    private http:HttpClient
    ) {

    this.credentials = [
    {username:'admin', password:'password', loginpath:'admin', token: '12345'},
    {username:'client', password:'password', loginpath:'client', token: '67890'}
  ]
   }



  setToken(token: string): void {
    localStorage.setItem('token',token);
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate([''])
  }

  login({ username, password}: any): Observable<any> {
    for(const element of this.credentials){
      if(username === element.username && password === element.password){
        this.setToken(element.token);
        return of({ path: element.loginpath})
      }
  }
    // if(username === 'admin' && password === 'admin'){
    //   this.setToken('abcdef12345');
    //   return of({ name: 'Admin Pogi'});
    // }
    return throwError(new Error('Failed to login.'));
  }




  loginpost(data:any): Observable<any> {
    const temp = this.http.post(`${this.baseUrl}/token`, null, {
      headers: {
        'Authorization': 'Basic ' + btoa(data.username + ':' + data.password),
      }
    })
    console.log('loginpost',temp);
    return temp;
  }

  loginAuth(jwtToken:any): string {
    let jsonToken:any = atob(jwtToken.split('.')[1]);
    jsonToken = JSON.parse(jsonToken)

    this.setToken(jwtToken);

    return jsonToken.sub;
  }
}
