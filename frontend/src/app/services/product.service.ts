import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public url;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getAllProducts(keyword: String): Observable<any> {
    return this.http.get(this.url + 'api/v1/products?keyword=' + keyword);
  }

  getProductById(id: String): Observable<any> {
    return this.http.get(this.url + 'api/v1/products/' + id);
  }

  getAllCategories(): Observable<any> {
    return this.http.get(this.url + 'api/v1/categories');
  }

  createProduct(product: any) {
    const fd = new FormData();
    fd.append('title', product.title);
    fd.append('description', product.description);
    fd.append('stock', product.stock);
    fd.append('image', product.image);
    fd.append('purchaseCost', product.purchaseCost);
    fd.append('saleCost', product.saleCost);
    fd.append('category', product.category);
    fd.append('points', product.points);

    return this.http.post(this.url + 'api/v1/products', fd);
  }

  updateProductById(product: any, id: String) {
    const fd = new FormData();
    fd.append('title', product.title);
    fd.append('description', product.description);
    fd.append('stock', product.stock);
    fd.append('image', product.image);
    fd.append('purchaseCost', product.purchaseCost);
    fd.append('saleCost', product.saleCost);
    fd.append('category', product.category);
    fd.append('points', product.points);

    return this.http.put(this.url + 'api/v1/products/' + id, fd);
  }

  createCategory(title: String, description: String) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(
      this.url + 'api/v1/categories',
      {
        title,
        description,
      },
      { headers: headers }
    );
  }
}
