import { Component } from '@angular/core';
import { StorageService } from '../../services/storage-service/storage.service';
import { User } from '../../../interfaces/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  currentUser!: User;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }
}
