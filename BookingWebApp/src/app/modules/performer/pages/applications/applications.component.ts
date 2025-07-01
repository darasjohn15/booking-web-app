import { AuthenticationService } from 'src/app/services/authentication.sevice';
import { Component } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { ApplicationsService } from 'src/app/services/applications.service';

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

  constructor(private authService: AuthenticationService, private applicationsService: ApplicationsService) {}

  ngOnInit(): void {
    this.performerId = this.authService.getUserId();
    this.loadApplications();
  }

  loadApplications(): void {
    this.applicationsService.getApplications({performer_id: this.performerId}).subscribe({
      next: applications => {
        this.applications = applications;
      },
      error: () => {}
    });
  }

  approve(applicationId: string) {
    let request = {
      id: applicationId,
      status: "approved"
    }

    this.applicationsService.updateApplication(request)
      .subscribe(() => {
        this.updateStatus(applicationId, 'approved');
      });
  }

  deny(applicationId: string) {
    let request = {
      id: applicationId,
      status: "denied"
    }

    this.applicationsService.updateApplication(request)
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
