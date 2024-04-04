// book-form.component.ts
import { Component } from '@angular/core';
import { Book } from '../book/book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {
  newBook: Book = {
    title: '',
    isbn: '',
    yearOfPublication: 0,
    numberOfPages: 0,
    language: '',
    group: '',
    evaluation: 0
  };

  constructor(private bookService: BookService) { }

  submitBookForm(): void {
    // Submit book form
    this.bookService.submitBookForm(this.newBook).subscribe(
      (response: any) => {
        console.log('Response from server:', response);
        // Clear form
        this.newBook = {
          title: '',
          isbn: '',
          yearOfPublication: 0,
          numberOfPages: 0,
          language: '',
          group: '',
          evaluation: 0
        };
      },
      (error: any) => {
        console.error('Error submitting book form:', error);
        // Ovdje možete dodati dodatne korake ako je potrebno
      }
    );
  }
}
