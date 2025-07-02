import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.sevice';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private usersService: UsersService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['host', Validators.required]
    }, { validators: passwordsMatchValidator });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      console.warn('Register Form Invalid');
      return;
    }

    const { name, email, password, role } = this.registerForm.value;

    this.usersService.createUser({ name, email, password, role }).subscribe({
      next: () => {
        // Optional: show a toast or success message
        this.authService.login({ email, password } ).subscribe({
          next: (res) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('role', role);

            const dashboardRoute = role === 'host' ? '/host' : '/performer';
            this.router.navigate([dashboardRoute]);
          },
          error: err => {
            console.error('Auto-login failed:', err);
            // fallback: redirect to login page
            this.router.navigate(['/login']);
          }
        });
      },
      error: err => {
        console.error('Registration failed:', err);
      }
    });
  }

  get passwordRequired(): boolean {
    const control = this.registerForm.get('password');
    return !!control?.errors?.['required'] && (control.dirty || control.touched);
  }

  get confirmPasswordRequired(): boolean {
    const control = this.registerForm.get('confirmPassword');
    return !!control?.errors?.['required'] && (control.dirty || control.touched);
  }

get passwordsMismatch(): boolean {
  return (
    this.registerForm.errors?.['passwordMismatch'] &&
    this.registerForm.get('confirmPassword')?.touched
  );
}

  get emailRequired(): boolean {
  const control = this.registerForm.get('email');
  return !!control?.errors?.['required'] && (control.dirty || control.touched);
}


  get emailInvalid(): boolean {
    const control = this.registerForm.get('email');
    return !!control && control.invalid && (control.dirty || control.touched);
}

  get emailFormatError(): boolean {
    const control = this.registerForm.get('email');
    return !!control?.errors?.['email'];
  }
}

export const passwordsMatchValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordMismatch: true };
  }

  return null;
};
