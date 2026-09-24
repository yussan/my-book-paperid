import { BookSearchDocument } from '../../core/models/open-library.model';

/**
 * Function to generate book cover URL
 * @param book
 * @returns {String}
 */
export function getCoverUrl(book: BookSearchDocument): string | null {
  if (book.cover_i === undefined || book.cover_i === null) {
    return null;
  }

  return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
}

/**
 * TODO: This features will available in next version Paper.id Book,
 * Function to generate random rating from 4-5,
 * @returns {Number} float
 */
export function getRandomRating(): number {
  const randomInt = Math.floor(Math.random() * (50 - 40 + 1)) + 40; // Generates an integer between 40 and 50
  return randomInt / 10; // Converts back to decimal: 4.0, 4.1, ..., 5.0
}
