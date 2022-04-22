import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User;

  constructor(private userService: UserService) {
    this.user = new User('', '', '', '', '', '');
  }

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    if (loginForm.valid) {
      this.userService.login(this.user.email, this.user.password).subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
