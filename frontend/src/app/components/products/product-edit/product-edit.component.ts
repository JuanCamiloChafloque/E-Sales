import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GLOBAL } from '../../../services/GLOBAL';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  public product!: any;
  public id!: any;
  public file!: File;
  public image!: String | ArrayBuffer | null;
  public categories!: any;
  public success: String = '';
  public error: String = '';
  public url;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.id = params['id'];
        this.productService.getProductById(this.id).subscribe({
          next: (result) => {
            this.product = result.product;
            console.log(this.product);
          },
          error: (err) => {},
        });
      },
      error: (err) => {},
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

  onSubmit(productForm: NgForm) {
    this.error = '';
    this.success = '';
    if (productForm.valid) {
      const product = {
        title: productForm.value.title,
        description: productForm.value.description,
        category: productForm.value.category,
        points: productForm.value.points,
        saleCost: productForm.value.saleCost,
        purchaseCost: productForm.value.purchaseCost,
        image: this.file,
      };
      this.productService.updateProductById(product, this.id).subscribe({
        next: () => {
          this.success = 'Product updated successfully';
        },
        error: (err) => {
          this.error = err.error.message;
        },
      });
    } else {
      this.error = 'Form is not valid. All fields are required';
    }
  }

  selectImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => (this.image = reader.result);
      reader.readAsDataURL(this.file);
    }
  }
}
