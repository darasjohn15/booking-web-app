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
  token?: Token | null

  constructor(private authService: AuthenticationService) {
    this.authService.token.subscribe(x => this.token = x)
  }

  logout() {
    this.authService.logout();
  }
}
