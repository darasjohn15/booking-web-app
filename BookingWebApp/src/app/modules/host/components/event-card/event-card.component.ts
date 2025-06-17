import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  @Input() event: any;
  @Output() editEvent = new EventEmitter<string>(); 
  selectedEvent: any = null;

  openView(event: any) {
    this.selectedEvent = event;
  }

  closeModal() {
    this.selectedEvent = null;
  }

  onEdit() {
    this.editEvent.emit(this.event.id);
  }
}