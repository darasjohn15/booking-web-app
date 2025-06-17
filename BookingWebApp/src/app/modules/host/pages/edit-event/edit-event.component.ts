import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventId!: string;
  eventForm: any = null;
  venues: string[] = ['Venue A', 'Venue B', 'Venue C']; // Replace with real data

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id')!;
    this.loadEvent();
  }

  loadEvent(): void {
    this.eventsService.getEvent(this.eventId).subscribe((event: any) => {
      this.eventForm = { ...event };
    });
  }

  submit(): void {
    // this.eventsService.updateEvent(this.eventId, this.eventForm).subscribe(() => {
    //   this.router.navigate(['/host']);
    // });
  }
}