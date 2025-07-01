import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Application } from 'src/app/models/application';
import { ApplicationsService } from 'src/app/services/applications.service';
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

  constructor(private authService: AuthenticationService,
              private applicationService: ApplicationsService
  ) {}

  ngOnInit(): void {
    this.performerId = this.authService.getUserId();
    this.applicationService.getApplications({event_id: this.event.id, performer_id: this.performerId}).subscribe({
      next: applications => {
        if(applications.length > 0)
          this.showApplied = true
        else
          this.showApplied = false
      },
      error: () => {
        this.showApplied = false
      }
    });
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
}
