import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'events', component: EventsComponent },
            { path: 'settings', component: SettingsComponent},
            { path: '', redirectTo: '/admin/home', pathMatch: 'full' }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AdminRoutingModule {}