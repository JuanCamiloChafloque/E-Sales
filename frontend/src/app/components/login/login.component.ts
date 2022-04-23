import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User;
  public errorMessage: String = '';

  constructor(private userService: UserService, private router: Router) {
    this.user = new User('', '', '', '', '', '');
  }

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    if (loginForm.valid) {
      this.errorMessage = '';
      this.userService.login(this.user.email, this.user.password).subscribe({
        next: (result) => {
          localStorage.setItem('user', JSON.stringify(result.user));
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
    }
  }
}
