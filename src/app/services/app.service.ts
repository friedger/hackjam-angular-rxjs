import {Injectable} from '@angular/core';
import {Book} from '../types/book';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
export class AppService {
  bookApiUrl: string = 'app/books';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get(this.bookApiUrl).map((resp: Response) => resp.json().data as Book[]);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get(`${this.bookApiUrl}/${id}`).map((resp: Response) => resp.json().data as Book);
  }

  // Adds a new book and re-fetch the list of books.
  create(title: string): Observable<Book[]> {
    return this.http.post(this.bookApiUrl, { title}).switchMap((resp: Response) => {
      if (resp.status === 201) {
        return this.getBooks();
      } else {
        throw new Error('failed to load books');
      }
    });
  }

  // Delete a book and re-fetch the list of books.
  delete(id: number): Observable<Book[]> {
    const url = `${this.bookApiUrl}/${id}`;
    return this.http.delete(url).switchMap((resp: Response) => {
      if (resp.status === 204) {
        return this.getBooks();
      } else {
        throw new Error('failed to load books' + resp);
      }
    });
  }

  // Update a book and re-fetch the list of books.
  update({id, title}): Observable<Book[]> {
    const url = `${this.bookApiUrl}/${id}`;
    console.log(url);
    return this.http.put(url, {id, title}, {headers: this.headers}).switchMap((resp: Response) => {
      if (resp.status === 204) {
        return this.getBooks();
      } else {
        throw new Error('failed to load books' + resp);
      }
    });
  }
}
