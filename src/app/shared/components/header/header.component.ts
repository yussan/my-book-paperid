import { CommonModule } from '@angular/common';
import { Component, computed, output, signal } from '@angular/core';

interface BookPreview {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

const STATIC_PREVIEW_BOOKS: BookPreview[] = [
  { key: '/works/OL1593564W', title: 'What do you say after you say hello?', author_name: ['Eric Berne'], first_publish_year: 1972, cover_i: 365987 },
  { key: '/works/OL1965523W', title: "What your mother couldn't tell you and your father didn't know", author_name: ['John Gray'], first_publish_year: 1994, cover_i: 22221 },
  { key: '/works/OL20162089W', title: 'Hacking Darwin', author_name: ['Jamie Metzl'], first_publish_year: 2019, cover_i: 8807926 },
  { key: '/works/OL14858394W', title: 'Bellwether', author_name: ['Connie Willis'], first_publish_year: 1996, cover_i: 3815579 },
  { key: '/works/OL18166755W', title: 'Current psychotherapies', author_name: ['Raymond J. Corsini', 'Danny Wedding'], first_publish_year: 2004, cover_i: 365069 },
  { key: '/works/OL8978487W', title: 'Nanofuture', author_name: ['J. Storrs Hall'], first_publish_year: 2005, cover_i: 862462 },
  { key: '/works/OL11542W', title: 'Atomic Habits', author_name: ['James Clear'], first_publish_year: 2018, cover_i: 8131453 },
  { key: '/works/OL26533678W', title: 'The Psychology of Money', author_name: ['Morgan Housel'], first_publish_year: 2020, cover_i: 9734438 },
  { key: '/works/OL24315529W', title: 'Deep Work', author_name: ['Cal Newport'], first_publish_year: 2016, cover_i: 8425666 },
  { key: '/works/OL1708923W', title: 'The Alchemist', author_name: ['Paulo Coelho'], first_publish_year: 1988, cover_i: 8175161 },
  { key: '/works/OL18848572W', title: 'Educated', author_name: ['Tara Westover'], first_publish_year: 2018, cover_i: 7997632 },
  { key: '/works/OL1933292W', title: 'Sapiens', author_name: ['Yuval Noah Harari'], first_publish_year: 2015, cover_i: 8012539 },
  { key: '/works/OL300280W', title: 'The Lean Startup', author_name: ['Eric Ries'], first_publish_year: 2011, cover_i: 7540087 },
  { key: '/works/OL74586W', title: 'Clean Code', author_name: ['Robert C. Martin'], first_publish_year: 2008, cover_i: 6600471 },
  { key: '/works/OL22821400W', title: 'The Hobbit', author_name: ['J.R.R. Tolkien'], first_publish_year: 1937, cover_i: 7491065 },
  { key: '/works/OL17379143W', title: 'Dune', author_name: ['Frank Herbert'], first_publish_year: 1965, cover_i: 8234328 },
  { key: '/works/OL24148976W', title: 'Atomic Habits', author_name: ['James Clear'], first_publish_year: 2018, cover_i: 8131453 },
  { key: '/works/OL18012087W', title: 'The Midnight Library', author_name: ['Matt Haig'], first_publish_year: 2020, cover_i: 8603985 },
  { key: '/works/OL110637W', title: 'Project Hail Mary', author_name: ['Andy Weir'], first_publish_year: 2021, cover_i: 8874826 },
  { key: '/works/OL22163554W', title: 'Fourth Wing', author_name: ['Rebecca Yarros'], first_publish_year: 2023, cover_i: 9171474 },
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
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
            <span class="absolute top-1/2 left-0 -translate-y-1/2 flex items-center justify-center pl-4 pointer-events-none text-slate-400">
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
              type="text"
              placeholder="Search"
              [value]="searchTerm()"
              (input)="onInput($event)"
              class="w-full pl-12 pr-4 py-3.5 bg-white text-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:text-teal-700 placeholder-slate-400 text-sm font-normal"
            />

            
          </div>

          <!-- Search result here -->
           
          @if (searchTerm().trim()) {
              <div class="mt-3 rounded-xl bg-white shadow-lg border border-slate-200 overflow-hidden">
                @if (isLoading()) {
                  <div class="px-4 py-3 text-sm text-slate-600">Waiting for results...</div>
                } @else if (filteredBooks().length) {
                  <div class="max-h-72 overflow-y-auto">
                    @for (book of filteredBooks().slice(0, 20); track book.key) {
                      <button
                        type="button"
                        class="flex w-full items-center gap-3 border-b border-slate-100 px-3 py-2.5 text-left transition hover:bg-slate-50 last:border-b-0"
                      >
                        <div class="h-12 w-9 shrink-0 overflow-hidden rounded-md bg-slate-100">
                          @if (book.cover_i) {
                            <img
                              [src]="getCoverUrl(book.cover_i)"
                              [alt]="book.title"
                              class="h-full w-full object-cover"
                            />
                          } @else {
                            <div class="flex h-full w-full items-center justify-center text-[8px] text-slate-400">No cover</div>
                          }
                        </div>

                        <div class="min-w-0 flex-1">
                          <div class="truncate text-sm font-semibold text-slate-800">{{ book.title }}</div>
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
          <!-- End of search result -->
        </div>
      </div>
    </section>
  `,
})
export class HeaderComponent {
  isSearchOpen = signal<boolean>(false);
  searchTerm = signal<string>('');
  isLoading = signal<boolean>(false);
  private searchTimer: number | null = null;

  searchQuery = output<string>();

  filteredBooks = computed(() => {
    const query = this.searchTerm().trim().toLowerCase();

    if (!query) {
      return [];
    }

    return STATIC_PREVIEW_BOOKS.filter((book) =>
      book.title.toLowerCase().includes(query) ||
      (book.author_name ?? []).some((author) => author.toLowerCase().includes(query))
    );
  });

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

    if (!value.trim()) {
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);

    this.searchTimer = window.setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }

  getCoverUrl(coverId: number): string {
    return `https://covers.openlibrary.org/b/id/${coverId}-S.jpg`;
  }
}
