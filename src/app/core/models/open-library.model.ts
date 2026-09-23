export interface BookSearchOptions {
  limit?: number;
  page?: number;
}

export interface BookSearchResponse {
  numFound: number;
  start: number;
  numFoundExact?: boolean;
  docs: BookSearchDocument[];
}

export interface BookSearchDocument {
  key: string;
  title: string;
  author_name?: string[];
  author_key?: string[];
  first_publish_year?: number;
  edition_key?: string[];
  cover_i?: number;
  isbn?: string[];
  publish_year?: number[];
  subject?: string[];
}
