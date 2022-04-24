import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css'],
})
export class SalesListComponent implements OnInit {
  public error: String = '';
  public success: String = '';
  public loggedInUser: any;
  public sales: any;
  public p: number = 1;

  constructor(
    private saleService: SaleService,
    private userService: UserService,
    private router: Router
  ) {
    this.loggedInUser = this.userService.getLoggedInUser();
  }

  ngOnInit(): void {
    if (this.loggedInUser) {
      this.saleService.getAllSales().subscribe({
        next: (result) => {
          this.sales = result.sales;
        },
        error: (err) => {
          this.error = err.error.message;
        },
      });
    } else {
      this.router.navigate(['/']);
    }
  }
}
