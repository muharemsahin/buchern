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
           // If an error occurred due to invalid data
            alert('Invalid data: ' + error.error.message);
          } else if (error.status === 409) {
            // If an error occurred due to a conflict (e.g. the book already exists)
            alert('The book already exists in the database.');
          } else {
            // If some other error occurred
            alert('An error occurred while saving the book.');
          }
          return throwError(error);
        })
      );
  }
}
