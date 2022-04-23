import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../../services/GLOBAL';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  public products: any;
  public url;
  public keyword: any;

  constructor(private productService: ProductService, private router: Router) {
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.productService.getAllProducts('').subscribe({
      next: (result) => {
        this.products = result.products;
      },
      error: (err) => {},
    });
  }

  search(searchForm: NgForm) {
    this.productService.getAllProducts(searchForm.value.filter).subscribe({
      next: (result) => {
        this.products = result.products;
      },
      error: (err) => {},
    });
  }
}
