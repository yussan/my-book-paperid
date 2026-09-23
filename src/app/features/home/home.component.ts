import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <section>
      <h1>Books</h1>
      <p>Welcome to MyBookPaperid.</p>
      <p>Choose a book to view its details.</p>
    </section>
  `,
})
export class HomeComponent {}
