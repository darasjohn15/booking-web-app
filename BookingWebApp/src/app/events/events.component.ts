import { Component } from '@angular/core';
import { Event } from '../models/event';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  currentUser?: string;
  events: Event[] = []

  constructor(eventsService: EventsService){
    this.currentUser = localStorage.getItem('userId')!
    console.log("Events Component: " + this.currentUser)

    eventsService.getEvents(this.currentUser).subscribe(data => this.events = data)
    console.log(this.events)
  }

}
