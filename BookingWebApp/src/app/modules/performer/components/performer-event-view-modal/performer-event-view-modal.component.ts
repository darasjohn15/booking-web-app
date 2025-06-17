import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.sevice';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-performer-event-view-modal',
  templateUrl: './performer-event-view-modal.component.html',
  styleUrls: ['./performer-event-view-modal.component.css']
})
export class PerformerEventViewModalComponent {
  @Input() event: any;
  @Output() close = new EventEmitter<void>();

  performerID = '';
  performerApplications: any[] = [];

  isDisabled: boolean = false;

  constructor( private authService: AuthenticationService,
               private eventsService: EventsService,
               private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.performerID = this.authService.getUserId();
    this.loadPerformerApplications();
  }

  applyToEvent(): void {
    let request = {
      eventID: this.event.id,
      performerID: this.performerID
    };

    this.eventsService.applyToEvent(request).subscribe({
      next: () => {
        this.snackBar.open('Applied successfully!', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to apply. Try again.', 'Close', { duration: 3000 });
      }
    });
  }

  loadPerformerApplications(): void {
    this.eventsService.getPerformerApplications(this.performerID).subscribe({
      next: applications => {
        this.performerApplications = applications
        this.isDisabled = this.disableApplyButton(applications)
      },
      error: () => {}
    });
  }

  disableApplyButton(applications: any[]): boolean {
    let disabled = false;

    applications.forEach(application => {
      if (application.event_id == this.event.id) {
        disabled = true
      }
    });

    return disabled
  }
}
