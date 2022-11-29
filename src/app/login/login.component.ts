import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder)
    {

      this.loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', Validators.required],
      })
   }


  ngOnInit(): void {
    if(this.auth.isLoggedIn()) {


    //   if(this.auth.getToken() === '12345'){
    //   this.router.navigate(['admin'])
    // }else {
    //   this.router.navigate(['home'])
    // }

      this.router.navigate([this.auth.loginAuth(this.auth.getToken())])
    }

  }

  login() {
    console.log("login", this.loginForm.value )
  }

  onSubmit() {
    this.loading = true;
    if(this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        result => {
          this.router.navigate([result.path])
        },
        (err: Error) => {
          alert(err.message)
        }
      )
    }
  }

  loginJWT(){
    let jwtToken;
    if(this.loginForm.valid){
      const temp = this.auth.loginpost(this.loginForm.value)
      .subscribe({
        next: (data) => {
        },
        error: (e) => {
          if(e.status === 401) {
            alert('Invalid username or password.')
          }else if(e.status === 200){
            jwtToken = e.error.text;
            this.router.navigate([this.auth.loginAuth(jwtToken)]);
          }

        },
        complete: () => {
        }
      })
    }

  }

}
