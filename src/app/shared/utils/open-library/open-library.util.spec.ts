import { BookSearchDocument } from '../../../core/models/open-library.model';
import { getCoverUrl, getRandomRating } from '../open-library/open-library.util';

describe('Open Library utilities', () => {
  const book: BookSearchDocument = {
    key: '/works/OL123W',
    title: 'A Test Book',
    cover_i: 123456,
  };

  describe('getCoverUrl', () => {
    it('should generate an Open Library cover URL', () => {
      // by default image size is M
      expect(getCoverUrl(book)).toBe('https://covers.openlibrary.org/b/id/123456-M.jpg');
    });

    it('should return null when the book has no cover', () => {
      expect(getCoverUrl({ ...book, cover_i: undefined })).toBeOneOf([""]);
      expect(getCoverUrl({ ...book, cover_i: null as never })).toBeOneOf([""]);
    });
  });

  describe('getRandomRating', () => {
    it('should return a rating between 4.0 and 5.0', () => {
      for (let index = 0; index < 100; index += 1) {
        const rating = getRandomRating();

        expect(rating).toBeGreaterThanOrEqual(4);
        expect(rating).toBeLessThanOrEqual(5);
      }
    });
  });
});
