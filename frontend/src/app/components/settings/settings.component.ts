import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule
  ],
  template: `
    <div class="settings-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Setări</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="settings-section">
            <h3>Profil</h3>
            <mat-form-field appearance="outline">
              <mat-label>Nume utilizator</mat-label>
              <input matInput [(ngModel)]="username" placeholder="Nume utilizator">
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput [(ngModel)]="email" placeholder="Email" type="email">
            </mat-form-field>
            
            <button mat-raised-button color="primary">Salvează modificările</button>
          </div>
          
          <div class="settings-section">
            <h3>Notificări</h3>
            <div class="toggle-option">
              <mat-slide-toggle [(ngModel)]="emailNotifications">Notificări email</mat-slide-toggle>
              <p>Primește notificări despre meciurile tale favorite</p>
            </div>
            
            <div class="toggle-option">
              <mat-slide-toggle [(ngModel)]="pushNotifications">Notificări push</mat-slide-toggle>
              <p>Primește notificări despre rezultatele meciurilor</p>
            </div>
          </div>
          
          <div class="settings-section">
            <h3>Preferințe</h3>
            <mat-form-field appearance="outline">
              <mat-label>Limba</mat-label>
              <mat-select [(ngModel)]="language">
                <mat-option value="ro">Română</mat-option>
                <mat-option value="en">English</mat-option>
              </mat-select>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Moneda</mat-label>
              <mat-select [(ngModel)]="currency">
                <mat-option value="RON">RON</mat-option>
                <mat-option value="EUR">EUR</mat-option>
                <mat-option value="USD">USD</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    mat-card {
      margin-bottom: 20px;
    }
    
    .settings-section {
      margin-bottom: 30px;
      
      h3 {
        margin-bottom: 20px;
        color: #333;
      }
    }
    
    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }
    
    .toggle-option {
      margin-bottom: 16px;
      
      p {
        margin: 5px 0 0;
        color: #666;
        font-size: 14px;
      }
    }
    
    button {
      margin-top: 10px;
    }
  `]
})
export class SettingsComponent {
  username: string = '';
  email: string = '';
  emailNotifications: boolean = true;
  pushNotifications: boolean = true;
  language: string = 'ro';
  currency: string = 'RON';
  
  constructor(private authService: AuthService) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.username = currentUser.username;
      this.email = currentUser.email;
    }
  }
} 