import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-user-event-details',
  templateUrl: './user-event-details.component.html',
  styleUrls: ['./user-event-details.component.css']
})
export class UserEventDetailsComponent implements OnInit {
  
  event: Event;

  constructor(
    private eventsService: EventsService,
    private coreService: CoreService,
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
        this.coreService.openSnackBar('Performer Removed from Show.');
        this.getEventDetails(this.data)
      }
    })
  }

  approvePerformer(performerId: any): void {
    console.log("Approved Performer - " + performerId)
    this.eventsService.approvePerformer(this.event.id!, performerId).subscribe({
      next: (res) => {
        console.log(res)
        this.coreService.openSnackBar('Performer Approved!');
        this.getEventDetails(this.data)
      }
    })
  }

  denyPerformer(performerId: any): void {
    console.log("Denied Performer - " + performerId)
    this.eventsService.denyPerformer(this.event.id!, performerId).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Performer Denied.');
        this.getEventDetails(this.data)
      }
    })
  }

  cancelEvent(): void {
    console.log('Cancelled Event - ' + this.event.id)
    this.eventsService.cancelEvent(this.event.id!).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Event has been cancelled.');
        this.getEventDetails(this.data)
      }
    })
  }

  activateEvent(): void {
    console.log('Activated Event - ' + this.event.id)
    this.eventsService.activateEvent(this.event.id!).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Event has been activated!');
        this.getEventDetails(this.data)
      }
    })
  }
}
