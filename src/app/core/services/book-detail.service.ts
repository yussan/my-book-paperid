// TODO: create global drawer component for muilti use case
import { Injectable, signal } from '@angular/core';

export interface BookDetail {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  rating?: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookDetailService {
  isOpen = signal<boolean>(false);
  selectedBook = signal<BookDetail | null>(null);

  openDrawer(book: BookDetail) {
    console.log('Open book:', book);

    this.selectedBook.set(book);
    this.isOpen.set(true);
  }

  closeDrawer() {
    this.isOpen.set(false);
  }
}
