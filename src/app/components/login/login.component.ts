import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage-service/storage.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoginFailed: boolean = false;
  isLoggedIn: boolean = false;
  role: string = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private snackBar: SnackbarService,
    private route: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.storageService.getUser().role;
        this.snackBar.showSuccess('Connexion réussie');
        this.route.navigate(['']);
      },
      error: (err) => {
        this.snackBar.showError((this.errorMessage = err.error.message));
        this.isLoginFailed = true;
      },
    });
  }
}
