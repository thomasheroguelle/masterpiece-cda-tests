import { Component } from '@angular/core';
import { StorageService } from '../../services/storage-service/storage.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLogged: boolean = false;
  isClicked: boolean = false;
  username?: string;
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.storageService.user$.subscribe((user) => {
      this.isLogged = !!user;
      this.username = user?.username;
    });
  }

  toggle() {
    this.isClicked = !this.isClicked;
  }

  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
