import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../../models/Product';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  public product: Product;
  public file!: File;
  public image!: String | ArrayBuffer | null;
  public categories!: any;
  public success: String = '';
  public error: String = '';

  constructor(private productService: ProductService) {
    this.product = new Product('', '', '', '', 0, 0, 0, '', 0);
  }

  ngOnInit(): void {
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
        stock: productForm.value.stock,
        category: productForm.value.category,
        points: productForm.value.points,
        saleCost: productForm.value.saleCost,
        purchaseCost: productForm.value.purchaseCost,
        image: this.file,
      };
      this.productService.createProduct(product).subscribe({
        next: () => {
          this.success = 'Product registered successfully';
          this.product = new Product('', '', '', '', 0, 0, 0, '', 0);
          this.image = null;
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
