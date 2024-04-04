import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book/book';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}`);
  }

  saveBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}`, book);
  }

  submitBookForm(bookData: any): Observable<Book> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Book>(this.baseUrl, bookData, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            alert('Neispravni podaci: ' + error.error.message);
          } else if (error.status === 409) {
            alert('Knjiga već postoji u bazi.');
          } else {
            alert('Došlo je do greške prilikom spremanja knjige.');
          }
          return throwError(error);
        })
      );
  }

  calculateEvaluation(book: Book): Observable<number> {
    let baseAmount = 100;
    let factor = this.calculateFactor(book.numberOfPages);
    let additionalAmount = 0;

    if (book.yearOfPublication < 1990) {
      additionalAmount += 15;
    }

    if (book.language === 'German') {
      additionalAmount += baseAmount * 0.1;
    }

    let evaluation = baseAmount * factor + additionalAmount;

    // Postavljanje evaluacije na knjigu
    book.evaluation = evaluation;

    // Ažuriranje knjige u bazi podataka
    return this.saveBook(book);
  }

  private calculateFactor(numberOfPages: number): number {
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
