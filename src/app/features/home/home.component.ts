import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BookSearchDocument } from '../../core/models/open-library.model';
import { OpenLibraryService } from '../../core/services/open-library.service';
import { BookCardComponent } from '../../shared/components/cards/book-card/book-card.component';
import { BookCardSkeletonComponent } from '../../shared/components/skeletons/book-card-skeleton.component';
import { getCoverUrl as getOpenLibraryCoverUrl, getRandomRating } from '../../shared/utils/open-library.util';

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
              [rating]="getRating()"
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
        const docs = Array.isArray((response as Partial<typeof response>)?.docs)
          ? response.docs
          : [];

        this.books = docs.slice(0, 6);
        this.errorMessage = '';
        this.isLoading = false;
      },
      error: () => {
        this.books = [];
        this.errorMessage = 'Unable to load trending books right now.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getCoverUrl(book: BookSearchDocument): string | null {
    return getOpenLibraryCoverUrl(book);
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
  getRating(): number {
    return getRandomRating()
  }
}
