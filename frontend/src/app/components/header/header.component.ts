import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    LoginDialogComponent,
    RegisterDialogComponent,
    MatDialogModule,
    CommonModule,
    RouterLink,
    MatIconModule
  ],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // Navigation links data (for scalability)
  homeLink = { label: 'Superbet', path: '/home' };
  navLinks = [
    { label: 'Sport', path: '/sport' },
    { label: 'Live', path: '/live', badge: "LOADED FROM BACKEND" },
    { label: 'Supersocial', path: '/supersocial' },
    { label: 'Biletele Mele', path: '/biletele-mele' }
  ];

  constructor(public dialog: MatDialog) {}

  // Methods for button actions (can be expanded later)
  onRegister() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Register result:', result);
        // Handle registration logic (e.g., call a service to register the user)
      }
    });
  }

  onLogin() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Login result:', result);
        // Handle login logic (e.g., call a service to log in the user)
      }
    });
  }
}
