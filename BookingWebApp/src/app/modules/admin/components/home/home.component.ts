import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  constructor(private userService: UsersService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo(): void {
    this.userService.getCurrentUser().subscribe(data => this.user = data);
  }

}
