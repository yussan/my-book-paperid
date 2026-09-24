import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailService } from '../../../../core/services/book-detail.service';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      (click)="selectBook()"
      class="flex flex-col bg-white cursor-pointer rounded-2xl p-3 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
    >
      <!-- Book Cover Container with Badge Overlay -->
      <div class="relative w-full aspect-3/4 bg-slate-100 rounded-xl overflow-hidden mb-3">
        @if (coverUrl()) {
          <img [src]="coverUrl()" [alt]="title()" class="w-full h-full object-cover" />
        } @else {
          <div
            class="w-full h-full flex items-center justify-center text-xs text-slate-400 font-medium"
          >
            No Cover
          </div>
        }

        <!-- Top-Right Badge (e.g. Crown / Award) -->
        <div
          class="absolute top-2 right-2 bg-amber-100/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm text-amber-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        </div>
      </div>

      <!-- Book Info -->
      <div class="flex flex-col flex-1 justify-between">
        <div>
          <h3 class="font-semibold text-slate-800 text-sm line-clamp-1 mb-0.5">{{ title() }}</h3>
          <p
            class="text-xs text-slate-400 line-clamp-1"
            [class.mb-0]="year()"
            [class.mb-2]="!year()"
          >
            {{ author() }}
          </p>
          @if (year()) {
            <p class="text-xs text-slate-400 line-clamp-1 mb-2">First publish {{ year() }}</p>
          }
        </div>

        <!-- Rating and Optional Tag -->
        <div class="flex items-center gap-2">
          <div
            class="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md text-amber-600 text-xs font-semibold"
          >
            <span>★</span>
            <span>{{ rating() }}</span>
          </div>

          @if (badgeText()) {
            <span class="bg-teal-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
              {{ badgeText() }}
            </span>
          }
        </div>
      </div>
    </div>
  `,
})
export class BookCardComponent {
  private bookService = inject(BookDetailService);

  title = input<string>('');
  author = input<string>('');
  year = input<number | undefined>(0);
  rating = input<number | string>('0');
  coverUrl = input<string | null>(null);
  badgeText = input<string | null>(null);

  selectBook() {
    this.bookService.openDrawer({
      key: this.title(),
      title: this.title(),
      author_name: [this.author()],
      first_publish_year: this.year(),
      rating: Number(this.rating()),
    });
  }
}
