import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
})
export class ClientCreateComponent implements OnInit {
  public client: Client;
  public success: String = '';
  public error: String = '';

  constructor(private clientService: ClientService) {
    this.client = new Client('', '', '', '', 10);
  }

  ngOnInit(): void {}

  onSubmit(clientForm: NgForm) {
    this.error = '';
    this.success = '';
    if (clientForm.valid) {
      const client = {
        name: clientForm.value.name,
        document: clientForm.value.document,
        email: clientForm.value.email,
      };
      this.clientService.createClient(client).subscribe({
        next: () => {
          this.success = 'Client registered successfully';
          this.client = new Client('', '', '', '', 10);
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
