import { AuthenticationService } from 'src/app/services/authentication.sevice';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {}
  logout(): void {
    this.auth.logout();
  }
}
