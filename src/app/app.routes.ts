import { Routes } from '@angular/router';
import { BookDetailComponent } from './features/books/book-detail.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'books/:id',
    component: BookDetailComponent,
  },
];
