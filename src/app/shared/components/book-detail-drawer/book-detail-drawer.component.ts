import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailService } from '../../../core/services/book-detail.service';

@Component({
  selector: 'app-book-detail-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (bookService.isOpen()) {
      <!-- Backdrop Overlay -->
      <div 
        class="fixed inset-0 z-40 bg-black/50 transition-opacity backdrop-blur-xs"
        (click)="bookService.closeDrawer()"
      ></div>

      <!-- Bottom Drawer Container -->
      <div 
        class="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl transition-transform duration-300 ease-out transform"
        [class.translate-y-0]="bookService.isOpen()"
        [class.translate-y-full]="!bookService.isOpen()"
      >
        <!-- Drag Handle / Header bar -->
        <div class="sticky top-0 bg-white pt-3 pb-2 px-6 flex items-center justify-between border-b border-slate-100 z-10">
          <div class="w-12 h-1.5 bg-slate-300 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2"></div>
          <span class="text-sm font-semibold text-slate-500 mt-2">Book Details</span>
          <button 
            type="button"
            (click)="bookService.closeDrawer()"
            class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition mt-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        @if (bookService.selectedBook(); as book) {
          <div class="p-6 pb-8 space-y-6">
            <!-- Main Info Row -->
            <div class="flex gap-4 items-start">
              <!-- Cover -->
              <div class="h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 shadow-md border border-slate-200">
                @if (book.cover_i) {
                  <img
                    [src]="'https://covers.openlibrary.org/b/id/' + book.cover_i + '-M.jpg'"
                    [alt]="book.title"
                    class="h-full w-full object-cover"
                  />
                } @else {
                  <div class="flex h-full w-full items-center justify-center text-xs text-slate-400 text-center p-2">No cover</div>
                }
              </div>

              <!-- Title, Author, Publish Year, Rating -->
              <div class="space-y-1.5 flex-1 min-w-0">
                <h2 class="text-lg font-bold text-slate-900 leading-tight">{{ book.title }}</h2>
                <p class="text-sm font-medium text-slate-600">
                  {{ book.author_name?.join(', ') || 'Unknown author' }}
                </p>
                
                <!-- First Publish Year -->
                <div class="text-xs text-slate-500 flex items-center gap-1.5">
                  <span class="font-semibold text-slate-700">First Published:</span> 
                  <span>{{ book.first_publish_year || '—' }}</span>
                </div>

                <!-- Rating -->
                <div class="flex items-center gap-1.5 pt-1">
                  <div class="flex text-amber-400">
                    @for (star of [1, 2, 3, 4, 5]; track star) {
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    }
                  </div>
                  <span class="text-xs font-semibold text-slate-700">{{ book.rating || '4.8' }} (128 reviews)</span>
                </div>
              </div>
            </div>

            <!-- Description / Details Placeholder -->
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
              <span class="font-semibold text-slate-700 block mb-1">About this book:</span>
              Explore the timeless insights and compelling narratives found within this edition. Fast shipping available through Paper.id Book store ecosystem.
            </div>

            <!-- Big Order Button -->
            <button
              type="button"
              (click)="onOrderNow(book)"
              class="w-full py-4 bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Order Now
            </button>
          </div>
        }
      </div>
    }
  `,
})
export class BookDetailDrawerComponent {
  bookService = inject(BookDetailService);

  onOrderNow(book: any) {
    alert(`Order placed successfully for: ${book.title}!`);
    this.bookService.closeDrawer();
  }
}