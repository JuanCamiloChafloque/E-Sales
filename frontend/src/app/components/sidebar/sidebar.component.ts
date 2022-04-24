import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public loggedInUser!: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loggedInUser = this.userService.getLoggedInUser();
  }
}
