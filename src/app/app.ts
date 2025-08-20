import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { ContactForm } from './shared/components/contact-form/contact-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ContactForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('contact-card-list-app');
}
