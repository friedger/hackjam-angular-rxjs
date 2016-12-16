import {Component, OnInit} from '@angular/core';
import {Book} from '../types/book';
import {AppService} from '../services/app.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'bs-books',
  templateUrl: 'books.template.html',
  styleUrls: ['books.component.css']
})
export class BooksComponent implements OnInit {
  books: Observable<Book[]>;
  selectedBook: Book;

  constructor(private router: Router, private appService: AppService) {
  }

  ngOnInit(): void {
    this.books = this.appService.getBooks();
  }

  add(title: string): void {
    title = title.trim();
    if (!title) {
      return;
    }
    this.books = this.appService.create(title);
  }

  delete(book: Book): void {
    this.books = this.appService.delete(book.id);
  }

  onSelect(book: Book): void {
    this.selectedBook = book;
  }

  gotoDetail(id: number): void {
    this.router.navigate(['/detail', id]);
  }
}
