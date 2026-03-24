import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authSpy: jasmine.SpyObj<AuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthenticationService', [
      'login',
      'isLoggedIn',
      'getRole'
    ]);

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthenticationService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ngOnInit logic
  it('should redirect if already logged in as host', () => {
    authSpy.isLoggedIn.and.returnValue(true);
    authSpy.getRole.and.returnValue('host');

    component.ngOnInit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/host']);
  });

  it('should redirect if already logged in as performer', () => {
    authSpy.isLoggedIn.and.returnValue(true);
    authSpy.getRole.and.returnValue('performer');

    component.ngOnInit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/performer']);
  });

  // togglePassword
  it('should toggle showPassword', () => {
    expect(component.showPassword).toBeFalse();

    component.togglePassword();
    expect(component.showPassword).toBeTrue();

    component.togglePassword();
    expect(component.showPassword).toBeFalse();
  });

  // 🧾 form validation
  it('should mark form as touched if invalid on submit', () => {
    spyOn(component.loginForm, 'markAllAsTouched');

    component.onSubmit();

    expect(component.loginForm.markAllAsTouched).toHaveBeenCalled();
  });

  // successful login
  it('should login and navigate on success (host)', () => {
    component.loginForm.setValue({
      email: 'test@test.com',
      password: '123456'
    });

    authSpy.login.and.returnValue(of({}));
    authSpy.getRole.and.returnValue('host');

    component.onSubmit();

    expect(authSpy.login).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '123456'
    });

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/host']);
  });

  it('should login and navigate on success (performer)', () => {
    component.loginForm.setValue({
      email: 'test@test.com',
      password: '123456'
    });

    authSpy.login.and.returnValue(of({}));
    authSpy.getRole.and.returnValue('performer');

    component.onSubmit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/performer']);
  });

  // login failure
  it('should set loginFail to true on error', () => {
    component.loginForm.setValue({
      email: 'test@test.com',
      password: '123456'
    });

    authSpy.login.and.returnValue(throwError(() => new Error('Login failed')));

    component.onSubmit();

    expect(component.loginFail).toBeTrue();
  });
});