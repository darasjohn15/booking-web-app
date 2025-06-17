import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformerRoutingModule } from './performer-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { PerformerNavbarComponent } from './components/performer-navbar/performer-navbar.component';
import { PerformerEventCardComponent } from './components/performer-event-card/performer-event-card.component';
import { PerformerEventViewModalComponent } from './components/performer-event-view-modal/performer-event-view-modal.component';
import { PerformerComponent } from './components/performer/performer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    DashboardComponent,
    ApplicationsComponent,
    PerformerNavbarComponent,
    PerformerEventCardComponent,
    PerformerEventViewModalComponent,
    PerformerComponent
  ],
  imports: [
    CommonModule,
    PerformerRoutingModule
  ]
})
export class PerformerModule { }
