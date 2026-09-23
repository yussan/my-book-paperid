import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <!-- search section -->
    <section class="bg-purplemain p-5">
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
          /* (input)="onInput($event)" */
          class="w-full pl-12 pr-4 py-3.5 bg-white text-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-slate-400 text-sm font-normal"
        />
      </div>
    </section>
    <!-- end of search section -->
  `,
})
export class HomeComponent {}
