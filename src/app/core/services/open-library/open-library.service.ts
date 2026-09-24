import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { API_HOST } from '../../config/api.config';
import { BookSearchOptions, BookSearchResponse } from '../../models/open-library.model';

const SEARCH_PATH = '/search.json';
const DEFAULT_LIMIT = 10;

@Injectable({ providedIn: 'root' })
export class OpenLibraryService {
  private readonly http = inject(HttpClient);

   /**
   * Function to fetch search book
   * @param limit 
   * @returns 
   */
  searchBooks(query: string, options: BookSearchOptions = {}): Observable<BookSearchResponse> {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return throwError(() => new Error('A search query is required.'));
    }

    let params = new HttpParams()
      .set('q', trimmedQuery)
      .set('fields', 'key,title,author_name,first_publish_year,cover_i')
      .set('limit', options.limit ?? DEFAULT_LIMIT);

    if (options.page !== undefined) {
      params = params.set('page', options.page);
    }

    const requestOptions = options.signal ? { params, signal: options.signal } : { params };

    return this.http.get<BookSearchResponse>(`${API_HOST}${SEARCH_PATH}`, requestOptions);
  }

  /**
   * Function to fetch list trending books
   * @param limit 
   * @returns 
   */
  getTrendingBooks(limit = 6): Observable<BookSearchResponse> {
    const params = new HttpParams()
      .set('q', 'subject:trending')
      .set('fields', 'key,title,author_name,first_publish_year,cover_i')
      .set('limit', limit);

    return this.http.get<BookSearchResponse>(`${API_HOST}${SEARCH_PATH}`, { params });
  }
}
