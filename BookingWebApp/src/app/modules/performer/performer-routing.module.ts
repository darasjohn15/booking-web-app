import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { authGuard } from 'src/app/guards/auth/auth.guard';
import { roleGuard } from 'src/app/guards/role/role.guard';
import { PerformerComponent } from './components/performer/performer.component';

const routes: Routes = [
  { 
    path: '', 
    component: PerformerComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['performer'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'applications', component: ApplicationsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformerRoutingModule {}
