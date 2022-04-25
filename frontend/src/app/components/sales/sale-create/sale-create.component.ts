import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sale } from '../../../models/Sale';
import { SaleService } from 'src/app/services/sale.service';
import { UserService } from 'src/app/services/user.service';
import { ClientService } from 'src/app/services/client.service';
import { NgForm } from '@angular/forms';
import { Detail } from 'src/app/models/Detail';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.component.html',
  styleUrls: ['./sale-create.component.css'],
})
export class SaleCreateComponent implements OnInit {
  public clients: any;
  public products: any;
  public product: any;
  public stock: any = 0;
  public cart: Array<any> = [];
  public sale: Sale;
  public detail: Detail;
  public loggedInUser: any;
  public error: String = '';
  public success: String = '';
  public total: any = 0;

  constructor(
    private saleService: SaleService,
    private clientService: ClientService,
    private userService: UserService,
    private productService: ProductService,
    private router: Router
  ) {
    this.loggedInUser = this.userService.getLoggedInUser();
    this.sale = new Sale('', '', '');
    this.detail = new Detail('', '', 0);
  }

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe({
      next: (result) => {
        this.clients = result.clients;
      },
      error: (err) => {
        this.error = err.error.message;
      },
    });

    this.productService.getAllProducts('').subscribe({
      next: (result) => {
        this.products = result.products;
      },
      error: (err) => {
        this.error = err.error.message;
      },
    });
  }

  onSubmit(saleForm: NgForm) {
    if (saleForm.valid) {
      const details = this.cart.map((item) => {
        return {
          product: item.id,
          quantity: Number(item.quantity),
        };
      });

      const sale = {
        client: this.sale.client,
        user: this.loggedInUser._id,
        details: details,
      };

      this.saleService.createSale(sale).subscribe({
        next: () => {
          this.success = 'Sale registered successfully';
          this.router.navigate(['/sales']);
        },
        error: (err) => {
          this.error = err.error.message;
        },
      });
    }
  }

  saveDetail(detailsForm: NgForm) {
    this.error = '';
    if (detailsForm.valid) {
      if (detailsForm.value.quantity <= this.product.stock) {
        this.cart.push({
          id: detailsForm.value.product,
          quantity: detailsForm.value.quantity,
          product: this.product.title,
          saleCost: this.product.saleCost,
        });

        this.total += detailsForm.value.quantity * this.product.saleCost;

        this.detail = new Detail('', '', 0);
        this.stock = 0;
      } else {
        this.error = 'There is not enough stock for that product';
      }
    }
  }

  getDataProduct(event: any) {
    this.productService.getProductById(event.target.value).subscribe({
      next: (result) => {
        this.product = result.product;
        this.stock = this.product.stock;
      },
      error: (err) => {
        this.error = err.error.message;
      },
    });
  }

  delete(id: number, saleCost: number, quantity: number) {
    this.cart.splice(id, 1);
    this.total -= saleCost * quantity;
  }
}
