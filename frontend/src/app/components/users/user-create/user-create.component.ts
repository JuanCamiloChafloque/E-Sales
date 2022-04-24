import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  public user: User;
  public loggedInUser: any;
  public success: String = '';
  public error: String = '';

  constructor(private userService: UserService, private router: Router) {
    this.user = new User('', '', '', '', '', '');
    this.loggedInUser = this.userService.getLoggedInUser();
  }

  ngOnInit(): void {
    if (!this.loggedInUser || this.loggedInUser.role !== 'admin') {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(userForm: NgForm) {
    this.error = '';
    this.success = '';
    if (userForm.valid) {
      const user = {
        name: userForm.value.name,
        lastName: userForm.value.lastName,
        role: userForm.value.role,
        email: userForm.value.email,
        password: userForm.value.password,
      };
      this.userService.register(user).subscribe({
        next: () => {
          this.success = 'User registered successfully';
          this.user = new User('', '', '', '', '', '');
        },
        error: (err) => {
          this.error = err.error.message;
        },
      });
    } else {
      this.error = 'Form is not valid. All fields are required';
    }
  }
}
