import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <header class="w-full bg-white text-gray-900 shadow-md pt-10">
        <div class="lg:max-w-lg mx-auto px-6 h-16 flex items-center justify-between">
          <!-- Center / Brand Title -->
          <img class="w-[180px]" src="/images/logo/paper.id-book.jpeg" alt="Logo Paper.id Book" />
          <!-- Right Item: Toggle Button -->
          <div>
            <button
              type="button"
              (click)="toggleSearch()"
              class="p-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl shadow-md transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
            >
              <!-- Search SVG Icon -->
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

      <!-- Smooth Collapsible Search Input Text Container -->
      <div
        class="overflow-hidden transition-all duration-300 ease-in-out bg-teal-600"
        [style.max-height.px]="isSearchOpen() ? 100 : 0"
        [style.opacity]="isSearchOpen() ? '1' : '0'"
      >
        <div class="p-5">
          <div class="relative w-full">
            <!-- Search Icon -->
            <span
              class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400"
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

            <!-- Input Field -->
            <input
              type="text"
              placeholder="Search"
              (input)="onInput($event)"
              class="w-full pl-12 pr-4 py-3.5 bg-white text-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:text-teal-700 placeholder-slate-400 text-sm font-normal"
            />
          </div>
        </div>
      </div>
      <!-- End of search input text -->
    </section>
  `,
})
export class HeaderComponent {
  // Init signals, use signal because UI need to listen automatically when value changes
  isSearchOpen = signal<boolean>(false);

  // Init output, use output to how child component talks back to its parent component
  searchQuery = output<string>();

  toggleSearch() {
    this.isSearchOpen.update((value) => !value);
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.emit(value);
  }
}
