import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sport', component: HomeComponent }, // Replace with actual components
  { path: 'live', component: HomeComponent },
  { path: 'supersocial', component: HomeComponent },
  { path: 'biletele-mele', component: HomeComponent }
];
