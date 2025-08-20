import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class ContactForm {
  get contactForm() {
    return this.contactService.contactForm;
  }

  get editingIndex() {
    return this.contactService.editingIndex;
  }

  constructor(private contactService: ContactService) {}

  public addContact() {
    this.contactService.addContact();
  }

  public deleteContact(index: number) {
    this.contactService.deleteContact(index);
  }

  public editContact(index: number) {
    this.contactService.editContact(index);
  }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.contactForm.patchValue({ picture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }
}
