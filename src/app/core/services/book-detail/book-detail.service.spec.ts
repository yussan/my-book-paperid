import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { BookDetailService, BookDetail } from './book-detail.service';

describe('BookDetailService', () => {
  let service: BookDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookDetailService],
    });
    service = TestBed.inject(BookDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.isOpen()).toBe(false);
    expect(service.selectedBook()).toBeNull();
  });

  it('should open the drawer and set the selected book', () => {
    const mockBook: BookDetail = {
      key: 'test-key',
      title: 'Test Title',
    };

    service.openDrawer(mockBook);

    expect(service.isOpen()).toBe(true);
    expect(service.selectedBook()).toEqual(mockBook);
  });

  it('should close the drawer', () => {
    service.isOpen.set(true); // Manually set to true first
    
    service.closeDrawer();

    expect(service.isOpen()).toBe(false);
  });
});
