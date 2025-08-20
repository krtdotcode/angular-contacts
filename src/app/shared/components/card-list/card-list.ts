import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-card-list',
  imports: [],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss'
})
export class CardList {
  constructor(public contactService: ContactService) {}

  get contacts() {
    return this.contactService.getContacts();
  }

  editContact(index: number) {
    this.contactService.editContact(index);
  }

  deleteContact(index: number) {
    this.contactService.deleteContact(index);
  }
}
