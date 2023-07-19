import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventsService } from 'src/app/services/events.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  
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

  requestToPerform(): void {
    console.log("You have requested to perform!")
    this.eventsService.request(this.event.id!).subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }

}
