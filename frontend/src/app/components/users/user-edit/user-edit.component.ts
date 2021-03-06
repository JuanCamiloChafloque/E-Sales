import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  public user!: any;
  public loggedInUser: any;
  public id!: any;
  public success: String = '';
  public error: String = '';
  public password: String = '';
  public url;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.url = GLOBAL.url;
    this.loggedInUser = this.userService.getLoggedInUser();
  }

  ngOnInit(): void {
    if (this.loggedInUser && this.loggedInUser.role === 'admin') {
      this.route.params.subscribe({
        next: (params) => {
          this.id = params['id'];
          this.userService.getUserById(this.id).subscribe({
            next: (result) => {
              this.user = result.user;
            },
            error: (err) => {},
          });
        },
        error: (err) => {},
      });
    } else {
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
        email: userForm.value.email,
        role: userForm.value.role,
        password: this.password,
      };
      this.userService.updateUserById(user, this.id).subscribe({
        next: () => {
          this.success = 'User updated successfully';
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
