import { Component } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  events: any[] = [];
  pagination = {
    page: 1,
    pageSize: 6,
    total: 0,
    totalPages: 0
  };

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
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
    this.eventsService.getEvents({ page_number: page }).subscribe({
      next: events => {
        this.events = events
        this.pagination.page = page;
        this.pagination.total = this.events.length > 0 ? this.events[0].total_count! : 0;
        this.pagination.pageSize = 6;

        this.pagination.totalPages = Math.ceil(this.pagination.total / this.pagination.pageSize);
      },
      error: () => {}
    });
  }
}
