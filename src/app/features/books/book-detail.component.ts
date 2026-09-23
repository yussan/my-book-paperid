import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  template: `
    <article>
      <p>Book detail</p>
      <h1>Book title</h1>
      <p>Book ID: {{ bookId }}</p>
      <p>
        This is the book detail page. Replace this text with the selected book's title, author,
        description, publication date, and other details.
      </p>
    </article>
  `,
})
export class BookDetailComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly bookId = this.route.snapshot.paramMap.get('id') ?? 'unknown';
}
