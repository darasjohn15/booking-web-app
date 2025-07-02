import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'host', loadChildren: () => import('./modules/host/host.module').then(m => m.HostModule) },
  { path: 'performer', loadChildren: () => import('./modules/performer/performer.module').then(m => m.PerformerModule) },
  { path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) }, 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' } // fallback
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
