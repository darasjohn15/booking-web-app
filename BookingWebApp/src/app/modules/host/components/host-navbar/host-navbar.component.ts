import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-navbar',
  templateUrl: './host-navbar.component.html',
  styleUrls: ['./host-navbar.component.css'] // optional
})
export class HostNavbarComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.clear(); // Or just remove the token and role
    this.router.navigate(['/login']);
  }
} 