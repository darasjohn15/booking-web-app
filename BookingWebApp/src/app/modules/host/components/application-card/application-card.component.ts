import { Component, Input } from '@angular/core';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.css']
})
export class ApplicationCardComponent {
  @Input() application: any;
  performer: any;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadApplicationCard()
  }

  loadApplicationCard(): void {
    this.usersService.getUser(this.application.performer_id).subscribe({
      next: user => {
        this.performer = user;
        console.log(this.performer);
      },
      error: () => {
        console.log('Could not load user.');
      }
    })
  }
}
