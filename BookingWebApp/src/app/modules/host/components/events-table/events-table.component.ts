import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css']
})
export class EventsTableComponent {
  @Input() events: any[] = [];
  @Output() onViewEvent = new EventEmitter<any>();

  viewEvent(event: any) {
    this.onViewEvent.emit(event);
  }
}