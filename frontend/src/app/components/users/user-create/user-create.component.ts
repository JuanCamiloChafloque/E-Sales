import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  public user: User;
  public success: String = '';
  public error: String = '';

  constructor(private userService: UserService) {
    this.user = new User('', '', '', '', '', '');
  }

  ngOnInit(): void {}

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
