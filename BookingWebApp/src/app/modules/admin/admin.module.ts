import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    DashboardComponent, 
    HeaderComponent, 
    FooterComponent, HomeComponent
],
  imports: [
    CommonModule, 
    AdminRoutingModule
]
})

export class AdminModule {}