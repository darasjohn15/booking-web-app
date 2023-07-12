import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.sevice';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  providers: [ AuthenticationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }