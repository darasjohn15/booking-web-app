import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        NavbarComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ],
    exports: []
})
export class AuthModule {}