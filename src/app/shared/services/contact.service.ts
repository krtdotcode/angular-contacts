import { Injectable } from '@angular/core';
import { Contact } from '../models/interfaces/contact.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      phone: '9171234567',
      email: 'alice@example.com',
      picture: 'https://avatar.iran.liara.run/public'
    }
  ];

  contactForm: FormGroup;

  editingIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    const contactsFromLocalStorage = localStorage.getItem('contacts');
    if(contactsFromLocalStorage) {
     this.contacts = JSON.parse(contactsFromLocalStorage);
    }

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      picture: ['https://avatar.iran.liara.run/public']
    });
  }

  getContacts(): Contact[] {
    return this.contacts;
  }

  addContact() {
    if (this.contactForm.valid) {
      if (this.editingIndex === null) {
        this.contacts.push(this.contactForm.value);
      } else {
        this.contacts[this.editingIndex] = this.contactForm.value;
        this.editingIndex = null;
      }
      localStorage.setItem('contacts', JSON.stringify(this.contacts));
      this.contactForm.reset();
    }
  }

  deleteContact(index: number) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contacts.splice(index, 1);
    }
  }

  editContact(index: number) {
    const contact = this.contacts[index];
    this.contactForm.patchValue(contact);
    this.editingIndex = index;
  }
}
