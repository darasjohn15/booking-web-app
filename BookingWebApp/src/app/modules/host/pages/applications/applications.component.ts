import { Component } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent {
  events: any[] = [];
  selectedEventId: string | null = null;
  applications: any[] = [];
  hostId: string = '';

    // ui state
    loading = true;
    error = '';

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.loadPage()
  }

  loadPage(): void {
    this.eventsService.getEvents().subscribe({
      next: events => {
        this.events = events
        if (events.length > 0) {
          this.selectEvent(events[0].id!);
        }
      },
      error: () => {
        this.error = 'Could not load events.';
        this.loading = false;
      }
    });
  }

  selectEvent(eventId: string): void {
    this.selectedEventId = eventId;
    this.loadApplications()
  }

  loadApplications(): void {
    // Replace this with an actual API call to fetch applications for venue
    this.eventsService.getApplications(this.selectedEventId!).subscribe({
      next: applications => {
        this.applications = applications.filter(app => app.status === 'pending');
      },
      error: () => {
        this.error = 'Could not load applications.';
        this.loading = false;
      }
    });
  }

  approve(applicationId: string) {
    this.eventsService.approveApplication({ eventID: this.selectedEventId, applicationID: applicationId })
      .subscribe(() => {
        this.updateStatus(applicationId, 'approved');
      });
  }

  deny(applicationId: string) {
    this.eventsService.denyApplication({ eventID: this.selectedEventId, applicationID: applicationId })
      .subscribe(() => {
        this.updateStatus(applicationId, 'denied');
      });
  }

  updateStatus(applicationId: string, newStatus: string) {
    const app = this.applications.find(a => a.id === applicationId);
    if (app) {
      app.status = newStatus;
    }
  }
}
