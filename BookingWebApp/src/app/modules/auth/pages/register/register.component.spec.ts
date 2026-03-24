import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { RegisterComponent, passwordsMatchValidator } from './register.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/user.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
    usersServiceSpy = jasmine.createSpyObj('UsersService', ['createUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function fillValidForm(role: 'host' | 'performer' = 'host'): void {
    component.registerForm.setValue({
      name: 'Razzo',
      email: 'razzo@example.com',
      password: 'secret123',
      confirmPassword: 'secret123',
      role,
    });
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default role host', () => {
    expect(component.registerForm).toBeTruthy();
    expect(component.registerForm.get('role')?.value).toBe('host');
  });

  it('should be invalid when required fields are empty', () => {
    component.registerForm.setValue({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'host',
    });

    expect(component.registerForm.invalid).toBeTrue();
  });

  it('should return passwordMismatch when passwords do not match', () => {
    component.registerForm.setValue({
      name: 'Razzo',
      email: 'razzo@example.com',
      password: 'secret123',
      confirmPassword: 'different123',
      role: 'host',
    });

    expect(component.registerForm.errors?.['passwordMismatch']).toBeTrue();
    expect(component.passwordsMismatch).toBeFalse(); // untouched confirmPassword
  });

  it('should report passwordsMismatch when confirmPassword has been touched', () => {
    component.registerForm.setValue({
      name: 'Razzo',
      email: 'razzo@example.com',
      password: 'secret123',
      confirmPassword: 'different123',
      role: 'host',
    });

    component.registerForm.get('confirmPassword')?.markAsTouched();

    expect(component.passwordsMismatch).toBeTrue();
  });

  it('should mark role as dirty and touched when setRole is called', () => {
    const roleControl = component.registerForm.get('role');

    component.setRole('performer');

    expect(roleControl?.value).toBe('performer');
    expect(roleControl?.dirty).toBeTrue();
    expect(roleControl?.touched).toBeTrue();
  });

  it('should not submit when form is invalid', () => {
    spyOn(console, 'warn');

    component.registerForm.setValue({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'host',
    });

    component.onSubmit();

    expect(console.warn).toHaveBeenCalledWith('Register Form Invalid');
    expect(usersServiceSpy.createUser).not.toHaveBeenCalled();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should create user, log in, store token and role, and navigate to host dashboard', () => {
    fillValidForm('host');

    usersServiceSpy.createUser.and.returnValue(of({}));
    authServiceSpy.login.and.returnValue(of({ token: 'abc123' }));

    spyOn(localStorage, 'setItem');

    component.onSubmit();

    expect(usersServiceSpy.createUser).toHaveBeenCalledWith({
      name: 'Razzo',
      email: 'razzo@example.com',
      password: 'secret123',
      role: 'host',
    });

    expect(authServiceSpy.login).toHaveBeenCalledWith({
      email: 'razzo@example.com',
      password: 'secret123',
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'abc123');
    expect(localStorage.setItem).toHaveBeenCalledWith('role', 'host');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/host']);
  });

  it('should navigate to performer dashboard after successful performer registration', () => {
    fillValidForm('performer');

    usersServiceSpy.createUser.and.returnValue(of({}));
    authServiceSpy.login.and.returnValue(of({ token: 'xyz789' }));

    spyOn(localStorage, 'setItem');

    component.onSubmit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/performer']);
  });

  it('should navigate to login if auto-login fails', () => {
    fillValidForm('host');

    usersServiceSpy.createUser.and.returnValue(of({}));
    authServiceSpy.login.and.returnValue(
      throwError(() => new Error('login failed'))
    );

    spyOn(console, 'error');

    component.onSubmit();

    expect(console.error).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should log an error if registration fails', () => {
    fillValidForm('host');

    usersServiceSpy.createUser.and.returnValue(
      throwError(() => new Error('registration failed'))
    );

    spyOn(console, 'error');

    component.onSubmit();

    expect(console.error).toHaveBeenCalled();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should show nameRequired when name is empty and touched', () => {
    const control = component.registerForm.get('name');
    control?.setValue('');
    control?.markAsTouched();

    expect(component.nameRequired).toBeTrue();
  });

  it('should show emailRequired when email is empty and touched', () => {
    const control = component.registerForm.get('email');
    control?.setValue('');
    control?.markAsTouched();

    expect(component.emailRequired).toBeTrue();
  });

  it('should show emailFormatError when email format is invalid', () => {
    const control = component.registerForm.get('email');
    control?.setValue('not-an-email');
    control?.markAsTouched();

    expect(component.emailInvalid).toBeTrue();
    expect(component.emailFormatError).toBeTrue();
  });

  it('should show passwordRequired when password is empty and touched', () => {
    const control = component.registerForm.get('password');
    control?.setValue('');
    control?.markAsTouched();

    expect(component.passwordRequired).toBeTrue();
  });

  it('should show confirmPasswordRequired when confirmPassword is empty and touched', () => {
    const control = component.registerForm.get('confirmPassword');
    control?.setValue('');
    control?.markAsTouched();

    expect(component.confirmPasswordRequired).toBeTrue();
  });
});

describe('passwordsMatchValidator', () => {
  it('should return null when passwords match', () => {
    const mockForm: any = {
      get: (field: string) => ({
        value: field === 'password' ? 'secret123' : 'secret123',
      }),
    };

    expect(passwordsMatchValidator(mockForm)).toBeNull();
  });

  it('should return passwordMismatch when passwords do not match', () => {
    const mockForm: any = {
      get: (field: string) => ({
        value: field === 'password' ? 'secret123' : 'different123',
      }),
    };

    expect(passwordsMatchValidator(mockForm)).toEqual({
      passwordMismatch: true,
    });
  });
});