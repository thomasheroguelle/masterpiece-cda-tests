import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  isSuccessful: boolean = false;
  isSignupFailed: boolean = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: SnackbarService,
    private route: Router,
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignupFailed = false;
        this.snackBar.showSuccess(
          (this.errorMessage =
            data.message +
            " , redirection vers la connexion de l'utilisateur..."),
        );
        this.route.navigate(['/login']);
      },
      error: (err) => {
        this.snackBar.showError((this.errorMessage = err.error.message));
        this.isSignupFailed = true;
      },
    });
  }
}
