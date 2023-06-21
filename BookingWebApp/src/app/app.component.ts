import { ActivatedRoute, Router } from '@angular/router';
import { Token } from './models/token';
import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.sevice';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  token?: string | null

  constructor(private authService: AuthenticationService) {
    this.token = this.authService.tokenValue
  }

  logout() {
    this.authService.logout();
  }
}
