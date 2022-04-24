import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  public url;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getAllClients(): Observable<any> {
    return this.http.get(this.url + 'api/v1/clients');
  }

  getClientById(id: String): Observable<any> {
    return this.http.get(this.url + 'api/v1/clients/' + id);
  }

  createClient(client: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(
      this.url + 'api/v1/clients',
      {
        name: client.name,
        document: client.document,
        email: client.email,
      },
      { headers: headers }
    );
  }

  updateClientById(client: any, id: String): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(
      this.url + 'api/v1/clients/' + id,
      {
        name: client.name,
        document: client.document,
        email: client.email,
        points: client.points,
      },
      { headers: headers }
    );
  }

  deleteClientById(id: String): Observable<any> {
    return this.http.delete(this.url + 'api/v1/clients/' + id);
  }
}
