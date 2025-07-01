import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-view-modal',
  templateUrl: './event-view-modal.component.html',
  styleUrls: ['./event-view-modal.component.css']
})
export class EventViewModalComponent {
  @Input() event: any;
  @Output() close = new EventEmitter<void>();

  performers: any[] = []
  performerNames: any[] = []

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    console.log(this.event)
    if (this.event?.performers) {
      this.loadPerformerNames(this.event.performers);
    }
  }

  loadPerformerNames(ids: string[]) {
    this.performerNames = [];

    ids.forEach(id => {
      this.usersService.getUser().subscribe(user => {
        if (user?.name) {
          this.performerNames.push(user.name);
        }
      });
    });
  }
}