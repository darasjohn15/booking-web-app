import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.sevice';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  loginFail: boolean = false;

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      let role = this.auth.getRole();
      if (role === 'host')
        this.router.navigate(['/host']);
      else
        this.router.navigate(['/performer']);
    }
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
        console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          console.log(result);
          const role = this.auth.getRole();
          
          if (role === 'host') {
            this.router.navigate(['/host']);
          }
          else {
            this.router.navigate(['/performer']);
          }
        },
        (err: Error) => {
          this.loginFail = true
        }
      );
    }
  }

  getLoginFail(): boolean {
    return this.loginFail
  }
}