import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_HOST } from '../config/api.config';
import { BookSearchResponse } from '../models/open-library.model';

@Injectable({ providedIn: 'root' })
export class TrendingBooksService {
  private readonly http = inject(HttpClient);

  /**
   * Function to get trending book
   * @param {Number} limit
   * @returns 
   */
  getTrendingBooks(limit = 6): Observable<BookSearchResponse> {
    const params = new HttpParams().set('q', 'subject:trending').set('limit', limit);

    return this.http.get<BookSearchResponse>(`${API_HOST}/search.json`, { params });
  }
}
