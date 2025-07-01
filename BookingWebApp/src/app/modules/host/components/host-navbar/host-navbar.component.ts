import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-navbar',
  templateUrl: './host-navbar.component.html',
  styleUrls: ['./host-navbar.component.css']
})
export class HostNavbarComponent {
  mobileMenuOpen = false;

  constructor(private router: Router, private eRef: ElementRef) {}

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.mobileMenuOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.mobileMenuOpen = false;
    }
  }
}