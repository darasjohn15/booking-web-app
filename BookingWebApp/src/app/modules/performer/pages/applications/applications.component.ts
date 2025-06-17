import { AuthenticationService } from 'src/app/services/authentication.sevice';
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
  performerId = '';

  // ui state
  loading = true;
  error = '';

  constructor(private authService: AuthenticationService, private eventsService: EventsService) {}

  ngOnInit(): void {
    this.performerId = this.authService.getUserId();
    this.loadApplications();
  }

  loadApplications(): void {
    this.eventsService.getPerformerApplications(this.performerId).subscribe({
      next: applications => {
        this.applications = applications;
      },
      error: () => {}
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

  getTestEvents() {
    let results = [
      {
        id: "1",
        title: "Test Event 1"
      }
    ]
    return results
  }

  getTestApplications() {
    let results = [
      {
        id: "1",
        event_id: "1",
        event_title: "Test Event 1",
        performer_id: "2",
        performer_name: "Test Performer",
        status: "pending"
      },
      {
        id: "2",
        event_id: "1",
        event_title: "Test Event 1",
        performer_id: "2",
        performer_name: "Test Performer",
        status: "approved"
      },
      {
        id: "3",
        event_id: "1",
        event_title: "Test Event 1",
        performer_id: "2",
        performer_name: "Test Performer",
        status: "denied"
      }
    ]
    return results
  }
}
