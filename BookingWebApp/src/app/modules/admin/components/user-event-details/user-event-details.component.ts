import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-user-event-details',
  templateUrl: './user-event-details.component.html',
  styleUrls: ['./user-event-details.component.css']
})
export class UserEventDetailsComponent implements OnInit {
  
  event: Event;

  constructor(
    private eventsService: EventsService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.event = {}
  }

  ngOnInit(): void {
    this.getEventDetails(this.data)
  }

  getEventDetails(id: string): void {
    this.eventsService.getEventDetails(id).subscribe({
      next: (res) => {
        console.log(res)
        this.event = res
      }
    })
  }

  removePerformer(performerId: any): void {
    console.log("Removed Performer - " + performerId)
    this.eventsService.removePerformer(this.event.id!, performerId).subscribe({
      next: (res) => {
        console.log(res)
        this.getEventDetails(this.data)
      }
    })
  }

  approvePerformer(performerId: any): void {
    console.log("Approved Performer - " + performerId)
    this.eventsService.approvePerformer(this.event.id!, performerId).subscribe({
      next: (res) => {
        console.log(res)
        this.getEventDetails(this.data)
      }
    })
  }

  denyPerformer(performerId: any): void {
    console.log("Denied Performer - " + performerId)
    this.eventsService.denyPerformer(this.event.id!, performerId).subscribe({
      next: (res) => {
        console.log(res)
        this.getEventDetails(this.data)
      }
    })
  }
}
