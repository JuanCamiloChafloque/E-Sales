import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from '../../../services/GLOBAL';
import { ClientService } from 'src/app/services/client.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css'],
})
export class ClientEditComponent implements OnInit {
  public client!: any;
  public id!: any;
  public success: String = '';
  public error: String = '';
  public url;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.id = params['id'];
        this.clientService.getClientById(this.id).subscribe({
          next: (result) => {
            this.client = result.client;
          },
          error: (err) => {},
        });
      },
      error: (err) => {},
    });
  }

  onSubmit(clientForm: NgForm) {
    this.error = '';
    this.success = '';
    if (clientForm.valid) {
      const client = {
        name: clientForm.value.name,
        document: clientForm.value.document,
        email: clientForm.value.email,
      };
      this.clientService.updateClientById(client, this.id).subscribe({
        next: () => {
          this.success = 'Client updated successfully';
        },
        error: (err) => {
          this.error = err.error.message;
        },
      });
    } else {
      this.error = 'Form is not valid. All fields are required';
    }
  }
}
