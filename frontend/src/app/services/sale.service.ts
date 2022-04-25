import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  public url;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getAllSales(): Observable<any> {
    return this.http.get(this.url + 'api/v1/sales');
  }

  createSale(sale: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(
      this.url + 'api/v1/sales',
      { user: sale.user, client: sale.client, details: sale.details },
      { headers: headers }
    );
  }

  getSaleById(id: String): Observable<any> {
    return this.http.get(this.url + 'api/v1/sales/' + id);
  }
}
