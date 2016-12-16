import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router';
import {Observable}        from 'rxjs/Observable';
import {Subject}           from 'rxjs/Subject';
import {SearchService} from '../services/search.service';
import {Book} from '../types/book';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'bs-book-search',
  templateUrl: 'book-search.template.html',
  styleUrls: ['book-search.component.css'],
  providers: [SearchService]
})
export class BookSearchComponent implements OnInit {
  term: FormControl = new FormControl();
  term$: Observable<string>;
  books: Observable<Book[]>;

  constructor(private searchService: SearchService,
    private router: Router) {
    this.term$ = this.term.valueChanges.debounceTime(300);
  }

  ngOnInit(): void {
    // Use the search service to monitor the results for the input value.
    this.books = this.searchService.search(this.term$);
  }

  gotoDetail(book: Book): void {
    this.router.navigate(['/detail', book.id]);
  }
}
