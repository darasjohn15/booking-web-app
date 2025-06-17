import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/models/event';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.sevice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']  // optional, if you’re using a CSS file
})
export class DashboardComponent implements OnInit {
  hostID = '';
  events: Event[] = [];

  // ui state
  loading = true;
  error = '';

  constructor(private router: Router,
              private authService: AuthenticationService, 
              private eventsService: EventsService) {}

  ngOnInit(): void {
    this.hostID = this.authService.getUserId();
    this.loadEvents();
  }


  private loadEvents(): void {
    this.eventsService.getHostEvents(this.hostID).subscribe({
      next: events => {
        this.events = events
      },
      error: () => {
        this.error = 'Could not load events.';
        this.loading = false;
      }
    });
  }

  handleViewEvent(event: any) {
    console.log('View clicked for:', event);
    // You could route to a detail view or open a modal here
  }

  onEditEvent(eventId: string) {
    this.router.navigate(['/host/edit-event', eventId]);
  }
  
}
