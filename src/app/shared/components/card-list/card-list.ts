import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-card-list',
  imports: [],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss'
})
export class CardList {
  sortAsc = true;

  constructor(public contactService: ContactService) {}

  get contacts() {
    return [...this.contactService.getContacts()].sort((a, b) => {
      const cmp = a.name.localeCompare(b.name);
      return this.sortAsc ? cmp : -cmp;
    });
  }

  toggleSort() {
    this.sortAsc = !this.sortAsc;
  }

  editContact(index: number) {
    this.contactService.editContact(index);
  }

  deleteContact(id: number) {
    this.contactService.deleteContactById(id);
  }
}
