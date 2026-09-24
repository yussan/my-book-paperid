import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BookSearchDocument } from '../../core/models/open-library.model';
import { OpenLibraryService } from '../../core/services/open-library.service';
import { BookCardComponent } from '../../shared/components/cards/book-card/book-card.component';
import { BookCardSkeletonComponent } from '../../shared/components/skeletons/book-card-skeleton.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BookCardComponent, BookCardSkeletonComponent],
  template: `
    <div class="p-6">
      <h2 class="text-lg font-bold text-slate-800 mb-4">Trending Books</h2>
      @if (isLoading) {
        <!-- Waiting response from API -->
        <div class="grid grid-cols-2 gap-4">
          @for (item of skeletonItems; track item) {
            <app-book-card-skeleton />
          }
        </div>
      } @else if (errorMessage) {
        <!-- Error response -->
        <div class="text-sm text-red-600">{{ errorMessage }}</div>
      } @else {
        <!-- Success response, render the books -->
        <div class="grid grid-cols-2 gap-4">
          @for (book of books; track book.key) {
            <app-book-card
              [title]="book.title"
              [author]="book.author_name?.join(', ') ?? 'Unknown Author'"
              // TODO: next feature from Paper.id Book, user rating
              [rating]="getRandomRating()"
              [coverUrl]="getCoverUrl(book)"
              [year]="book.first_publish_year"
              badgeText="Trending"
            />
          }
        </div>
      }
    </div>
  `,
})
export class HomeComponent implements OnInit {
  private readonly openLibraryService = inject(OpenLibraryService);

  books: BookSearchDocument[] = [];
  isLoading = true;
  errorMessage = '';
  readonly skeletonItems = Array.from({ length: 6 }, (_, index) => index);

  ngOnInit(): void {
    this.openLibraryService.getTrendingBooks(6).subscribe({
      next: (response) => {
        this.books = response.docs.slice(0, 6);
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load trending books right now.';
        this.isLoading = false;
      },
    });
  }

  /**
   * Function to generate URL of book cover
   * @param book
   * @returns
   */
  getCoverUrl(book: BookSearchDocument): string | null {
    if (book.cover_i === undefined || book.cover_i === null) {
      return null;
    }

    return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
  }

  /**
   * Function to get Book Key
   * @param _
   * @param book
   * @returns
   */
  trackByBookKey(_: number, book: BookSearchDocument): string {
    return book.key;
  }

  /**
   * TODO: This features will available in next version Paper.id Book,
   * Function to generate random rating from 4-5,
   * @returns {Number} float
   */
  getRandomRating(): number {
    const randomInt = Math.floor(Math.random() * (50 - 40 + 1)) + 40; // Generates an integer between 40 and 50
    return randomInt / 10; // Converts back to decimal: 4.0, 4.1, ..., 5.0
  }
}
