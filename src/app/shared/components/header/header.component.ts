import { CommonModule } from '@angular/common';
import { Component, inject, output, signal } from '@angular/core';
import { BookSearchDocument, BookSearchResponse } from '../../../core/models/open-library.model';
import { OpenLibraryService } from '../../../core/services/open-library/open-library.service';
import { BookDetailService } from '../../../core/services/book-detail/book-detail.service';
import { SearchResultSkeletonComponent } from '../skeletons/search-result-skeleton.component';
import { getCoverUrl as getOpenLibraryCoverUrl } from '../../utils/open-library/open-library.util';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SearchResultSkeletonComponent],
  template: `
    <section>
      <header class="w-full bg-white text-gray-900 shadow-md pt-6">
        <div class="lg:max-w-lg mx-auto px-6 h-16 flex items-center justify-between">
          <img class="w-45" src="/images/logo/paper.id-book.jpeg" alt="Logo Paper.id Book" />

          <div class="flex items-center self-center shrink-0">
            <button
              type="button"
              (click)="toggleSearch()"
              class="p-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl shadow-md transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer self-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 stroke-[2.2]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        class="overflow-hidden transition-all duration-300 ease-in-out bg-teal-600"
        [style.max-height.px]="isSearchOpen() ? 440 : 0"
        [style.opacity]="isSearchOpen() ? '1' : '0'"
      >
        <div class="p-5">
          <div class="relative w-full">
            <span
              class="absolute top-1/2 left-0 -translate-y-1/2 flex items-center justify-center pl-4 pointer-events-none text-slate-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 stroke-[2.2]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>

            <input
              autofocus
              type="text"
              placeholder="Search"
              [value]="searchTerm()"
              (input)="onInput($event)"
              class="w-full pl-12 pr-4 py-3.5 bg-white text-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:text-teal-700 placeholder-slate-400 text-sm font-normal"
            />
          </div>

          @if (searchTerm().trim()) {
            <div
              class="mt-3 rounded-xl bg-white shadow-lg border border-slate-200 overflow-hidden animate-[fadeIn_0.2s_ease-out]"
            >
              @if (isLoading()) {
                <app-search-result-skeleton />
              } @else if (searchResults().length) {
                <div class="max-h-72 overflow-y-auto overflow-x-hidden">
                  @for (book of searchResults().slice(0, 20); track book.key) {

                    <button
                      type="button"
                      (click)="selectBook(book)"
                      class="flex w-full items-center gap-3 border-b border-slate-100 px-3 py-2.5 text-left transition-all duration-200 ease-out hover:bg-slate-50 hover:translate-x-0.5 last:border-b-0"
                    >
                      <div class="h-12 w-9 shrink-0 overflow-hidden rounded-md bg-slate-100">
                        @if (book.cover_i) {
                          <img
                            [src]="book.cover_url"
                            [alt]="book.title"
                            class="h-full w-full object-cover"
                          />
                        } @else {
                          <div
                            class="flex h-full w-full items-center justify-center text-[8px] text-slate-400"
                          >
                            No cover
                          </div>
                        }
                      </div>

                      <div class="min-w-0 flex-1">
                        <div class="truncate text-sm font-semibold text-slate-800">
                          {{ book.title }}
                        </div>
                        <div class="truncate text-xs text-slate-500">
                          {{ book.author_name?.join(', ') || 'Unknown author' }}
                        </div>
                        <div class="mt-0.5 text-[11px] text-slate-400">
                          {{ book.first_publish_year || '—' }}
                        </div>
                      </div>
                    </button>
                  }
                </div>
              } @else {
                <div class="px-4 py-3 text-sm text-slate-600">No results found.</div>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class HeaderComponent {
  private readonly openLibraryService = inject(OpenLibraryService);
  private bookService = inject(BookDetailService);

  isSearchOpen = signal<boolean>(false);
  searchTerm = signal<string>('');
  searchResults = signal<BookSearchDocument[]>([]);
  isLoading = signal<boolean>(false);

  private searchTimer: number | null = null;
  private latestRequestId = 0;
  private activeRequestController: AbortController | null = null;

  searchQuery = output<string>();

  toggleSearch() {
    this.isSearchOpen.update((value) => !value);
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    this.searchQuery.emit(value);

    if (this.searchTimer) {
      window.clearTimeout(this.searchTimer);
    }

    if (this.activeRequestController) {
      this.activeRequestController.abort();
      this.activeRequestController = null;
    }

    if (!value.trim()) {
      this.searchResults.set([]);
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);

    // Make sure user stop typing and start to fetchData, waiting 200ms after stop typing
    this.searchTimer = window.setTimeout(() => {
      const requestId = ++this.latestRequestId;

      // Stop waiting request
      this.activeRequestController = new AbortController();

      this.openLibraryService
        .searchBooks(value, {
          limit: 20,
          signal: this.activeRequestController.signal,
        })
        .subscribe({
          next: (response: BookSearchResponse) => {
            if (requestId !== this.latestRequestId) {
              return;
            }

            // Normalize response
            const docs = Array.isArray((response as Partial<BookSearchResponse>)?.docs)
              ? (response as BookSearchResponse).docs.map(book => {
                  book.cover_url = this.getCoverUrl(book);
                  return book;
                })
              : [];

            this.searchResults.set(docs.slice(0, 10));
            this.isLoading.set(false);
            this.searchTimer = null;
            this.activeRequestController = null;
          },
          error: () => {
            if (requestId !== this.latestRequestId) {
              return;
            }

            this.searchResults.set([]);
            this.isLoading.set(false);
            this.searchTimer = null;
            this.activeRequestController = null;
          },
        });
    }, 200);
  }

  getCoverUrl(book: BookSearchDocument): string {
    // Get image URL for small size for search result
    return getOpenLibraryCoverUrl(book, "S");
  }

  // Open detail book to start order
  selectBook(book: BookSearchDocument) {
    this.bookService.openDrawer({
      ...book,
      rating: 4.9, // TODO: integrate rating on next version. Optional mock rating
    });
  }
}
