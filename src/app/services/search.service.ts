import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Book} from '../types/book';

@Injectable()
export class SearchService {
  constructor() {
  }

  search(term: Observable<string>): Observable<Book[]> {
    throw new Error('Oops. Not yet implemented...');
  }

  private raw_search(term: string): Observable<Book[]> {
    const url = `app/books/?title=${term}`;
    throw new Error('Oops. Not yet implemented...');
  }
}
