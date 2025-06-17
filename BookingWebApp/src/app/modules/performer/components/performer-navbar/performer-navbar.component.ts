import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-performer-navbar',
  templateUrl: './performer-navbar.component.html',
  styleUrls: ['./performer-navbar.component.css']
})
export class PerformerNavbarComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.clear(); // Or just remove the token and role
    this.router.navigate(['/login']);
  }
}
