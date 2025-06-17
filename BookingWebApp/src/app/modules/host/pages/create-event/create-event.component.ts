import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.sevice';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  eventForm!: FormGroup;
  venueID: String = "" 
  hostID: String = "" 
  venues: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private eventsService: EventsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadVenues();
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      venueID: ['', Validators.required],
      description: [''],
    });
    this.hostID = this.authService.getUserId()
  }

  loadVenues(): void {
    this.venues = [
      {
        id: "1",
        name: "Venue 1"
      },
      {
        id: "2",
        name: "Venue 2"
      },
      {
        id: "3",
        name: "Venue 3"
      },
      {
        id: "4",
        name: "Venue 4"
      },
      {
        id: "5",
        name: "Venue 5"
      }
    ]
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const newEvent = {
        ...this.eventForm.value,
        hostID: this.hostID
      };

      console.log(newEvent);

      this.eventsService.createEvent(newEvent).subscribe({
        next: () => {
          alert('Event created!');
          this.router.navigate(['/host/dashboard']);
        },
        error: (err) => {
          console.error(err);
          alert('Error creating event.');
        }
      });
    }
  }
}