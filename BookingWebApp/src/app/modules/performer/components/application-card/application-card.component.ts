import { Component, Input, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.css']
})
export class ApplicationCardComponent implements OnInit {
  @Input() application: any; // expects the application object with at least an eventId
  eventDetails: any;
  hostDetails: any;

  constructor(private eventsService: EventsService,
              private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.eventsService.getEvent(this.application.event_id).subscribe({
      next: (data) => {
        this.eventDetails = data;
        console.log(data)
        console.log("Calling Users Service to get Host Details.")
        this.usersService.getUser(this.eventDetails.host_id).subscribe({
          next: (data) => {
          this.hostDetails = data;
          console.log(data)
        },
        error: (err) => {
          console.error('Failed to fetch event details:', err);
        }
    });
      },
      error: (err) => {
        console.error('Failed to fetch event details:', err);
      }
    });
  }
}
