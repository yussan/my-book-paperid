import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { API_HOST } from '../config/api.config';
import { BookSearchOptions, BookSearchResponse } from '../models/open-library.model';

const SEARCH_PATH = '/search.json';
const DEFAULT_LIMIT = 10;

@Injectable({ providedIn: 'root' })
export class OpenLibraryService {
  private readonly http = inject(HttpClient);

  searchBooks(query: string, options: BookSearchOptions = {}): Observable<BookSearchResponse> {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return throwError(() => new Error('A search query is required.'));
    }

    let params = new HttpParams()
      .set('q', trimmedQuery)
      .set('fields', 'key,title, author_name,first_publish_year')
      .set('limit', options.limit ?? DEFAULT_LIMIT);

    if (options.page !== undefined) {
      params = params.set('page', options.page);
    }

    return this.http.get<BookSearchResponse>(`${API_HOST}${SEARCH_PATH}`, { params });
  }
}
