import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { BetSlipMenuComponent } from '../../shared/components/bet-slip-menu/bet-slip-menu.component';
import { AuthService, User } from '../../services/auth.service';
import { MatchService } from '../../services/match.service';
import { Subscription } from 'rxjs';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

// Define the type for navigation links
interface NavLink {
  path: string;
  label: string;
  badge?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    BetSlipMenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  username = '';
  navLinks: NavLink[] = [
    { path: '/home', label: 'Home' },
    { path: '/live', label: 'Live', badge: '0' },
    { path: '/sport', label: 'Sport' },
    { path: '/supersocial', label: 'SuperSocial' }
  ];
  private subscription = new Subscription();
  private authSubscription: Subscription = new Subscription();
  private liveMatchesSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private matchService: MatchService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.authSubscription = this.authService.authState$.subscribe(
      (user: User | null) => {
        this.isLoggedIn = !!user;
        if (user) {
          this.username = user.username;
        }
      }
    );

    // Subscribe to live matches count
    this.liveMatchesSubscription = this.matchService.getLiveMatches().subscribe(
      (matches: any[]) => {
        const liveCount = matches.length;
        this.navLinks = this.navLinks.map(link => 
          link.path === '/live' ? { ...link, badge: liveCount.toString() } : link
        );
      }
    );

    // Check initial auth state
    this.checkAuthState();
  }
  // Add to HeaderComponent
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.authSubscription.unsubscribe();
    this.liveMatchesSubscription.unsubscribe();
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.checkAuthState();
      }
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.checkAuthState();
      }
    });
  }

  private checkAuthState(): void {
    const user = this.authService.getCurrentUser();
    this.isLoggedIn = !!user;
    if (user) {
      this.username = user.username;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
