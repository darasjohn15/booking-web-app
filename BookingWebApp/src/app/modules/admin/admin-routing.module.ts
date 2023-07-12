import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: '', redirectTo: '/admin/home', pathMatch: 'full' }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AdminRoutingModule {}