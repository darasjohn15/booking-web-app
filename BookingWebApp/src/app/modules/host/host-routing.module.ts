import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { authGuard } from '../../guards/auth/auth.guard';
import { roleGuard } from '../../guards/role/role.guard';
import { HostComponent } from './components/host/host.component';
import { EditEventComponent } from './pages/edit-event/edit-event.component';

const routes: Routes = [
  {
    path: '',
    component: HostComponent, 
    canActivate: [authGuard, roleGuard],
    data: { roles: ['host'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'create-event', component: CreateEventComponent },
      { path: 'applications', component: ApplicationsComponent },
      { path: 'edit-event/:id', component: EditEventComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }