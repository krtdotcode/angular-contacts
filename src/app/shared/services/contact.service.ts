import { Injectable } from '@angular/core';
import { Contact } from '../models/interfaces/contact.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];

  contactForm: FormGroup;

  editingIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    const contactsFromLocalStorage = localStorage.getItem('contacts');
    if(contactsFromLocalStorage) {
     this.contacts = JSON.parse(contactsFromLocalStorage);
    }

    this.contactForm = this.fb.group({
      id: [this.contacts.length + 1],
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
        const newContact = {
        ...this.contactForm.value,
        id: this.contacts.length > 0 ? this.contacts[this.contacts.length - 1].id + 1 : 1,
        picture: this.contactForm.value.picture || 'https://avatar.iran.liara.run/public'
      };
      this.contacts.push(newContact);
      } else {
        const updatedContact = {
        ...this.contactForm.value,
        id: this.contacts[this.editingIndex].id,
        picture: this.contactForm.value.picture || 'https://avatar.iran.liara.run/public'
      };
      this.contacts[this.editingIndex] = updatedContact;
      this.editingIndex = null;
      }
      localStorage.setItem('contacts', JSON.stringify(this.contacts));

      // Reset with default values
    this.contactForm.reset({
      id: this.contacts.length > 0 ? this.contacts[this.contacts.length - 1].id + 1 : 1,
      name: '',
      phone: '',
      email: '',
      picture: 'https://avatar.iran.liara.run/public'
    });
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
