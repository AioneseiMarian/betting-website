import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    RouterModule
  ],
  template: `
    <div class="profile-container">
      <mat-card class="profile-header">
        <div class="profile-cover"></div>
        <div class="profile-info">
          <div class="profile-avatar">
            <span class="material-icons">account_circle</span>
          </div>
          <div class="profile-details">
            <h2>{{ currentUser?.username }}</h2>
            <p>{{ currentUser?.email }}</p>
            <button mat-stroked-button color="primary" (click)="navigateToSettings()">
              <span class="material-icons">edit</span>
              Editează profilul
            </button>
          </div>
        </div>
      </mat-card>
      
      <mat-card class="profile-stats">
        <div class="stat-item">
          <span class="stat-value">0</span>
          <span class="stat-label">Bilete</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">0</span>
          <span class="stat-label">Urmăritori</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">0</span>
          <span class="stat-label">Urmăriți</span>
        </div>
      </mat-card>
      
      <mat-card class="profile-content">
        <mat-tab-group>
          <mat-tab label="Activitate">
            <div class="tab-content">
              <p>Nu există activitate recentă.</p>
            </div>
          </mat-tab>
          
          <mat-tab label="Biletele mele">
            <div class="tab-content">
              <p>Nu există bilete.</p>
            </div>
          </mat-tab>
          
          <mat-tab label="Preferințe">
            <div class="tab-content">
              <mat-list>
                <mat-list-item>
                  <span class="material-icons">sports_soccer</span>
                  <span>Fotbal</span>
                </mat-list-item>
                <mat-divider></mat-divider>
                <mat-list-item>
                  <span class="material-icons">sports_basketball</span>
                  <span>Baschet</span>
                </mat-list-item>
                <mat-divider></mat-divider>
                <mat-list-item>
                  <span class="material-icons">sports_tennis</span>
                  <span>Tenis</span>
                </mat-list-item>
              </mat-list>
            </div>
          </mat-tab>
        </mat-tab-group>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
      margin-top: 72px; // Pentru a compensa header-ul fix
    }
    
    .profile-header {
      margin-bottom: 20px;
      overflow: hidden;
    }
    
    .profile-cover {
      height: 150px;
      background: linear-gradient(to right, #ff0000, #ff6b6b);
    }
    
    .profile-info {
      display: flex;
      padding: 0 20px 20px;
      margin-top: -50px;
    }
    
    .profile-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
      border: 4px solid white;
      
      .material-icons {
        font-size: 60px;
        color: #666;
      }
    }
    
    .profile-details {
      flex: 1;
      padding-top: 50px;
      
      h2 {
        margin: 0 0 5px;
        font-size: 24px;
      }
      
      p {
        margin: 0 0 15px;
        color: #666;
      }

      button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        
        .material-icons {
          font-size: 20px;
        }
      }
    }
    
    .profile-stats {
      display: flex;
      justify-content: space-around;
      padding: 20px;
      margin-bottom: 20px;
    }
    
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .stat-value {
        font-size: 24px;
        font-weight: bold;
        color: #ff0000;
      }
      
      .stat-label {
        color: #666;
        font-size: 14px;
      }
    }
    
    .profile-content {
      margin-bottom: 20px;
    }
    
    .tab-content {
      padding: 20px;
    }
    
    mat-list-item {
      height: 48px;
      
      .material-icons {
        margin-right: 10px;
        color: #666;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
  }
} 