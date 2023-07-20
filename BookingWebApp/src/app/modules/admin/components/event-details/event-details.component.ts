import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventsService } from 'src/app/services/events.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  
  event: Event;
  private currentUserId: string;
  performers: string[]
  hostName: string = ""

  constructor(
    private eventsService: EventsService,
    private usersService: UsersService, 
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.event = {}
    this.currentUserId = localStorage.getItem('userId')!
    this.performers = []
  }

  ngOnInit(): void {
    this.getEventDetails(this.data)
    
  }

  getEventDetails(id: string): void {
    this.eventsService.getEventDetails(id).subscribe({
      next: (res) => {
        console.log(res)
        this.event = res
        this.getHostName()
        this.getPerformerNames()
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

  isUsersEvent() {
    return this.event['hostID'] == this.currentUserId
  }

  getHostName(): void {
    this.usersService.getUser(this.event.hostID!).subscribe({
      next: (res) => {
        this.hostName = res.firstName + " " + res.lastName
      }
    })
  }

  getPerformerNames(): void {
    
    this.event.performers!.forEach(performerUserId => {
      this.usersService.getUser(performerUserId).subscribe({
        next: (res) => {
          console.log(res.firstName + " " + res.lastName!)
          this.performers.push(res.firstName + " " + res.lastName)
        }
      })
    });
  }

}
