import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/models/event';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.sevice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  hostID = '';
  events: Event[] = [];
  pagination = {
  page: 1,
  pageSize: 6,
  total: 0,
  totalPages: 0
};

  // ui state
  loading = true;
  error = '';

  constructor(private router: Router,
              private authService: AuthenticationService, 
              private eventsService: EventsService) {}

  ngOnInit(): void {
    this.hostID = this.authService.getUserId();
    this.loadEvents();
  }

  get pageNumbers(): number[] {
  return Array.from(
    { length: this.pagination.totalPages },
    (_, i) => i + 1
  );
}

goToPage(page: number): void {
  if (page !== this.pagination.page) {
    this.loadEvents(page);
  }
}

nextPage(): void {
  if (this.pagination.page < this.pagination.totalPages) {
    this.loadEvents(this.pagination.page + 1);
  }
}

prevPage(): void {
  if (this.pagination.page > 1) {
    this.loadEvents(this.pagination.page - 1);
  }
}


  private loadEvents(page: number = 1): void {
    this.eventsService.getEvents({ host_id: this.hostID, page_number: page }).subscribe({
      next: events => {
        this.events = events
        this.pagination.page = page;
        this.pagination.total = this.events.length > 0 ? this.events[0].total_count! : 0;
        this.pagination.pageSize = 6;

        this.pagination.totalPages = Math.ceil(this.pagination.total / this.pagination.pageSize);
      },
      error: () => {
        this.error = 'Could not load events.';
        this.loading = false;
      }
    });
  }

  handleViewEvent(event: any) {
    console.log('View clicked for:', event);
    // You could route to a detail view or open a modal here
  }

  onEditEvent(eventId: string) {
    this.router.navigate(['/host/edit-event', eventId]);
  }
  
}
