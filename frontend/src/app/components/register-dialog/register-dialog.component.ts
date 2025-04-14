import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // For notifications

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule, // Add MatSnackBarModule for notifications
  ],
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent {
  registerForm: FormGroup;
  hidePassword = true;
  isLoading = false; // To show a loading state

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private fb: FormBuilder,
    private authService: AuthService, // Inject AuthService
    private snackBar: MatSnackBar // Inject MatSnackBar for notifications
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsDoNotMatch: true };
  }

  get passwordsDoNotMatch(): boolean {
    return this.registerForm.hasError('passwordsDoNotMatch');
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true; // Show loading state
      const registerData = {
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
      };

      this.authService.register(registerData).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
          this.dialogRef.close(true); // Close dialog with success
        },
        error: (error: any) => {
          this.isLoading = false;
          this.snackBar.open(error.message || 'Registration failed!', 'Close', { duration: 3000 });
        },
      });
    }
  }
}
