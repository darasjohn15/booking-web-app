import { AuthenticationService } from './services/authentication.sevice';
import { EventsComponent } from './events/events.component';
import { Routes, RouterModule } from '@angular/router';
import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './login/auth.guard';


const routes: Routes = [
  //otherwise redirect to home
  { path: '', 
    component: HomeComponent, 
    canActivate: [authGuard]
  },
  { path: 'Events', 
    component: EventsComponent,
    canActivate: [authGuard]
  },
  { path: 'Login', component: LoginComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
