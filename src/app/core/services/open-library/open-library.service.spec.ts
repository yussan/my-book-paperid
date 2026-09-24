import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { OpenLibraryService } from './open-library.service';
import { API_HOST } from '../../config/api.config';
import { BookSearchResponse } from '../../models/open-library.model';

describe('OpenLibraryService', () => {
  let service: OpenLibraryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpenLibraryService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(OpenLibraryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchBooks', () => {
    it('should fetch books with correct parameters', () => {
      const mockResponse: BookSearchResponse = {
        numFound: 1,
        start: 0,
        docs: [
          { key: '1', title: 'Test Book' }
        ]
      };

      service.searchBooks('angular', { limit: 5, page: 2 }).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(request => 
        request.url === `${API_HOST}/search.json` && 
        request.params.get('q') === 'angular' &&
        request.params.get('limit') === '5' &&
        request.params.get('page') === '2'
      );

      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should throw an error if query is empty', (done) => {
      service.searchBooks('   ').subscribe({
        error: (err) => {
          expect(err.message).toBe('A search query is required.');
        }
      });
    });
  });

  describe('getTrendingBooks', () => {
    it('should fetch trending books', () => {
      const mockResponse: BookSearchResponse = {
        numFound: 1,
        start: 0,
        docs: [
          { key: '1', title: 'Trending Book' }
        ]
      };

      service.getTrendingBooks(3).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(request => 
        request.url === `${API_HOST}/search.json` && 
        request.params.get('q') === 'subject:trending' &&
        request.params.get('limit') === '3'
      );

      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
