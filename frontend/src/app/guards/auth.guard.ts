import { inject } from '@angular/core';
import { type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const dialog = inject(MatDialog);

  if (authService.isAuthenticated()) {
    return true;
  }

  //Open login dialog
  const dialogRef = dialog.open(LoginDialogComponent, {
    width: '400px',
    disableClose: true
  });
  try {
    // Wait for dialog to close and check if login was successful
    const result = await firstValueFrom(dialogRef.afterClosed());
    return result === true;
  } catch (error) {
    console.error('Login dialog error:', error);
    return false;
  }
}; 