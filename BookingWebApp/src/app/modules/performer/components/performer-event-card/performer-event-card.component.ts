import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Application } from 'src/app/models/application';
import { AuthenticationService } from 'src/app/services/authentication.sevice';

@Component({
  selector: 'app-performer-event-card',
  templateUrl: './performer-event-card.component.html',
  styleUrls: ['./performer-event-card.component.css']
})
export class PerformerEventCardComponent {
  @Input() event: any;
  @Output() editEvent = new EventEmitter<string>(); 
  selectedEvent: any = null;

  performerId: string = '';
  showApplied: boolean = false;
  performerApplications: Application[] = []

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.performerApplications = this.event.applications;
    this.performerId = this.authService.getUserId();
    this.hasPerformerApplied();
  }

  openView(event: any) {
    this.selectedEvent = event;
  }

  closeModal() {
    this.selectedEvent = null;
  }

  onEdit() {
    this.editEvent.emit(this.event.id);
  }

  hasPerformerApplied(): void {
      this.event.applications.forEach((application: { performer_id: string; }) => {
        if (application.performer_id == this.performerId) {
          this.showApplied = true;
        }
      });
  }
}
