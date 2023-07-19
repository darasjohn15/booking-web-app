import { UserEventDetailsComponent } from './../user-event-details/user-event-details.component';
import { MatDialog } from '@angular/material/dialog';
import { EventsService } from "src/app/services/events.service";
import { Component, OnInit } from '@angular/core';
import { Event } from "src/app/models/event";

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent implements OnInit{

  events: Event[] = []

  constructor(
    private dialog: MatDialog,
    private eventsService: EventsService){

  }

  ngOnInit(): void {
    this.getEventsList();
  }

  getEventsList() {
    this.eventsService.getCurrentUserEvents().subscribe(data => this.events = data)
  }

  cancelEvent(id: any) {
    this.eventsService.cancelEvent(id).subscribe()
    this.getEventsList()
  }

  openEventDetails(id: any) {
    this.dialog.open(UserEventDetailsComponent, {data: id})
  }


}
