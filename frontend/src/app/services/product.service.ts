import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';

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

  getAllCategories(): Observable<any> {
    return this.http.get(this.url + 'api/v1/categories');
  }

  createProduct(product: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
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
}
