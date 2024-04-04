import { Component, OnInit } from '@angular/core';
import { Book } from '../book/book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  evaluatedBook: Book | null = null;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  // U `BookListComponent`, provjerite da li su podaci u obliku niza prije nego što ih prosljedite komponenti

  loadBooks() {
    this.bookService.getBooks().subscribe(
      (books: Book[]) => {
        // Izračunajte evaluaciju za svaku knjigu prije dodavanja u listu
        this.books = books.map(book => ({
          ...book,
          evaluation: this.calculateEvaluation(book)
        }));
      },
      (error: any) => {
        console.error('Greška prilikom dohvatanja knjiga:', error);
      }
    );
  }
  
//submitBookForm() {
  // Submit book form logic
  // After successfully submitting the form, reload the list of books
 // this.loadBooks();
//}

  calculateEvaluation(book: Book): number {
    let baseAmount = 100;
    let factor = this.calculateFactor(book.numberOfPages);
    let additionalAmount = 0;

    if (book.yearOfPublication < 1990) {
      additionalAmount += 15;
    }

    if (book.language === 'German') {
      additionalAmount += baseAmount * 0.1;
    }

    let evaluation = (baseAmount * factor + additionalAmount);
    return Number(evaluation.toFixed(2));
  }

  


  calculateFactor(numberOfPages: number): number {
    if (numberOfPages < 50) {
      return 0.7;
    } else if (numberOfPages < 100) {
      return 1;
    } else if (numberOfPages < 200) {
      return 1.1;
    } else if (numberOfPages < 300) {
      return 1.2;
    } else if (numberOfPages < 500) {
      return 1.3;
    } else {
      return 1.5;
    }
  }
}
