import { Component, NgModule, OnInit, Pipe } from '@angular/core';
import { User } from '../../allModels/user';
import { UserService } from '../../allServices/user.service';
import { CommonModule, JsonPipe, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatToolbarModule,
    MatIconModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit{
 users: User[] = [];
 user !:User;

  constructor(private userSer: UserService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userSer.getUserList().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

  loadUser(id: number): void {
    this.userSer.getSingleUserAPI(id).subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  deleteUser(id: number): void {
    this.userSer.getDeleteAPI(id).subscribe(
      () => {
        console.log('User deleted successfully');
       
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}