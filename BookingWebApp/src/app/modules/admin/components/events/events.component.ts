import { EventsService } from 'src/app/services/events.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { EventAddEditComponent } from '../event-add-edit/event-add-edit.component';
import { Event } from 'src/app/models/event';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[] = []
  idCount = 5

  constructor(
    private _dialog: MatDialog,
    private eventsService: EventsService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getEventsList()
  }

  getEventsList() {
    this.eventsService.getActiveEvents().subscribe(data => this.events = data)
  }

  addEvent() {
    let newEvent = {
      id: this.idCount,
      event: 'Test Event',
      venue: 'Test Venue',
      date: 'TBD'
    }
  }

  cancelEvent(id: any) {
    this.eventsService.cancelEvent(id).subscribe()
    this.getEventsList()
  }

  openAddEditEventForm() {
    const dialogRef = this._dialog.open(EventAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEventsList();
        }
      } 
    });
  }

  openEventDetails(id: any) {
    this._dialog.open(EventDetailsComponent, {data: id} );
  }
}
