import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../../services/GLOBAL';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  public products: any;
  public url;
  public keyword: any;
  public categories!: any;
  public error: String = '';
  public success: String = '';
  public title: String = '';
  public description: String = '';
  public p: number = 1;

  constructor(private productService: ProductService, private router: Router) {
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.productService.getAllProducts('').subscribe({
      next: (result) => {
        this.products = result.products;
      },
      error: (err) => {
        this.error = err.error.message;
      },
    });

    this.productService.getAllCategories().subscribe({
      next: (result) => {
        this.categories = result.categories;
      },
      error: (err) => {
        this.error = err.error.message;
      },
    });
  }

  search(searchForm: NgForm) {
    this.productService.getAllProducts(searchForm.value.filter).subscribe({
      next: (result) => {
        this.products = result.products;
      },
      error: (err) => {
        this.error = err.error.message;
      },
    });
  }

  onSubmitCategory(categoryForm: NgForm) {
    this.error = '';
    this.success = '';
    if (categoryForm.valid) {
      this.productService
        .createCategory(this.title, this.description)
        .subscribe({
          next: () => {
            this.productService.getAllCategories().subscribe({
              next: (result) => {
                this.categories = result.categories;
                $('#modal-save-categoria').modal('hide');
                this.success = 'New category registered successfully';
              },
              error: (err) => {
                this.error = err.error.message;
              },
            });
          },
          error: (err) => {
            this.error = err.error.message;
          },
        });
    }
  }

  deleteProduct(id: String) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProductById(id).subscribe({
          next: () => {
            this.productService.getAllProducts('').subscribe({
              next: (result) => {
                this.products = result.products;
                Swal.fire(
                  'Deleted!',
                  'Product deleted successfully.',
                  'success'
                );
              },
              error: (err) => {
                this.error = err.error.message;
              },
            });
          },
          error: (err) => {
            Swal.fire(
              'The product could not be deleted!',
              err.error.message,
              'error'
            );
          },
        });
      }
    });
  }
}
