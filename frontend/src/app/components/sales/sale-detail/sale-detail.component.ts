import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from '../../../services/GLOBAL';
import { SaleService } from 'src/app/services/sale.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css'],
})
export class SaleDetailComponent implements OnInit {
  public sale!: any;
  public id!: any;
  public loggedInUser: any;
  public success: String = '';
  public error: String = '';
  public p: number = 1;
  public url;

  constructor(
    private saleService: SaleService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.url = GLOBAL.url;
    this.loggedInUser = this.userService.getLoggedInUser();
  }

  ngOnInit(): void {
    if (this.loggedInUser) {
      this.route.params.subscribe({
        next: (params) => {
          this.id = params['id'];
          this.saleService.getSaleById(this.id).subscribe({
            next: (result) => {
              this.sale = result.sale;
            },
            error: (err) => {},
          });
        },
        error: (err) => {},
      });
    } else {
      this.router.navigate(['/']);
    }
  }
}
