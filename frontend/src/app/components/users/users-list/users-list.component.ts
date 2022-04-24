import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../../services/GLOBAL';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  public users: any;
  public loggedInUser: any;
  public url;
  public error: String = '';
  public success: String = '';
  public p: number = 1;

  constructor(private userService: UserService, private router: Router) {
    this.url = GLOBAL.url;
    this.loggedInUser = this.userService.getLoggedInUser();
  }

  ngOnInit(): void {
    if (this.loggedInUser && this.loggedInUser.role === 'admin') {
      this.userService.getAllUsers().subscribe({
        next: (result) => {
          this.users = result.users;
        },
        error: (err) => {
          this.error = err.error.message;
        },
      });
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
