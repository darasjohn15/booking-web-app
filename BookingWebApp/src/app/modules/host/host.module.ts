import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostRoutingModule } from './host-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { HostNavbarComponent } from './components/host-navbar/host-navbar.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsTableComponent } from './components/events-table/events-table.component';
import { HostComponent } from './components/host/host.component';
import { EventViewModalComponent } from './components/event-view-modal/event-view-modal.component';
import { EditEventComponent } from './pages/edit-event/edit-event.component';
import { FormsModule } from '@angular/forms';
import { ApplicationCardComponent } from './components/application-card/application-card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CreateEventComponent,
    ApplicationsComponent,
    HostNavbarComponent,
    EventCardComponent,
    ApplicationCardComponent,
    EventsTableComponent,
    HostComponent,
    EventViewModalComponent,
    EditEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HostRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    HostNavbarComponent
  ]
})
export class HostModule { }