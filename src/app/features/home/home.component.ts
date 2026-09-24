import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { BookSearchDocument } from '../../core/models/open-library.model';
import { OpenLibraryService } from '../../core/services/open-library/open-library.service';
import { BookCardComponent } from '../../shared/components/cards/book-card/book-card.component';
import { BookCardSkeletonComponent } from '../../shared/components/skeletons/book-card-skeleton.component';
import { getCoverUrl as getOpenLibraryCoverUrl, getRandomRating } from '../../shared/utils/open-library/open-library.util';

// Solve hydration server and client
const TRENDING_BOOKS_KEY = makeStateKey<BookSearchDocument[]>('trending-books');

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
            <!-- TODO: next feature from Paper.id Book, user rating -->
            <app-book-card
              [title]="book.title"
              [author]="book.author_name?.join(', ') ?? 'Unknown Author'"
              [rating]="book.rating ?? 4.9"
              [coverUrl]="book.cover_url"
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
  // Used to transfer fetched data from the server directly to the browser
  private readonly transferState = inject(TransferState);
  // Used to check if the code is currently running on the server or in the browser
  private readonly platformId = inject(PLATFORM_ID);

  isLoading:boolean = true

  books: BookSearchDocument[] = [];
 
  errorMessage = '';
  readonly skeletonItems = Array.from({ length: 6 }, (_, index) => index);

  ngOnInit(): void {
    if (this.transferState.hasKey(TRENDING_BOOKS_KEY)) {
      this.books = this.transferState.get(TRENDING_BOOKS_KEY, []);
      this.isLoading = false;
      
      if (isPlatformBrowser(this.platformId)) {
        return; // Use cached data on the browser
      }
    }
    this.openLibraryService.getTrendingBooks(6).subscribe({
      next: (response) => {
        const docs = Array.isArray((response as Partial<typeof response>)?.docs)
          ? response.docs.map(book => {
              book.cover_url = this.getCoverUrl(book);
              book.rating = this.getRating();
              return book;
            })
          : [];

        this.books = docs.slice(0, 6);
        this.transferState.set(TRENDING_BOOKS_KEY, this.books);
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

  /**
   * Function to get cover URL from Open Library
   * @param book 
   * @returns 
   */
  getCoverUrl(book: BookSearchDocument): string {
    return getOpenLibraryCoverUrl(book);
  }

  /**
   * TODO: This features will available in next version Paper.id Book,
   * Function to generate random rating from 4-5,
   * @returns {Number} float
   */
  getRating(): number {
    return 4.9;
  }
}
