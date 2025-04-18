import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'live',
    loadComponent: () => import('./components/live/live.component').then(m => m.LiveComponent)
  },
  {
    path: 'sport',
    loadComponent: () => import('./components/sport/sport.component').then(m => m.SportComponent)
  },
  {
    path: 'supersocial',
    loadComponent: () => import('./components/supersocial/supersocial.component').then(m => m.SupersocialComponent)
  },
  {
    path: 'biletele-mele',
    loadComponent: () => import('./components/biletele-mele/biletele-mele.component').then(m => m.BileteleMeleComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./components/settings/settings.component').then(m => m.SettingsComponent)
  }
];
