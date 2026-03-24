import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // keep as-is (or switch to .scss if you want)
})
export class LoginComponent implements OnInit {
  // UI state
  showPassword = false;
  loginFail = false;

  // Form
  loginForm = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      const role = this.auth.getRole();
      this.router.navigate([role === 'host' ? '/host' : '/performer']);
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.loginFail = false;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // NOTE: If your service expects a plain object, this is perfect:
    const payload = this.loginForm.getRawValue();

    this.auth.login(payload).subscribe({
      next: () => {
        const role = this.auth.getRole();
        this.router.navigate([role === 'host' ? '/host' : '/performer']);
      },
      error: () => {
        this.loginFail = true;
      },
    });
  }

  // Nice-to-haves for template
  get emailCtrl() {
    return this.loginForm.controls.email;
  }
  get passwordCtrl() {
    return this.loginForm.controls.password;
  }
}
