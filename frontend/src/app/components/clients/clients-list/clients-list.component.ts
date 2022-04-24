import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { GLOBAL } from '../../../services/GLOBAL';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
})
export class ClientsListComponent implements OnInit {
  public clients: any;
  public url;
  public error: String = '';
  public success: String = '';
  public p: number = 1;

  constructor(private clientService: ClientService, private router: Router) {
    this.url = GLOBAL.url;
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
  }

  deleteClient(id: String) {
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
        this.clientService.deleteClientById(id).subscribe({
          next: () => {
            this.clientService.getAllClients().subscribe({
              next: (result) => {
                this.clients = result.clients;
                Swal.fire(
                  'Deleted!',
                  'Client deleted successfully.',
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
              'The Client could not be deleted!',
              err.error.message,
              'error'
            );
          },
        });
      }
    });
  }
}
