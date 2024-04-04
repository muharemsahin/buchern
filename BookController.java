package com.javaguides.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    // Endpoint za dobavljanje svih knjiga
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok().body(books);
    }

    // Endpoint za stvaranje nove knjige
    @PostMapping
    public ResponseEntity<?> createBook(@RequestBody Book book) {
        // Validacija ISBN-a
        if (bookService.isISBNValid(book.getIsbn())) {
            // Provjera da li je ISBN već prisutan u bazi podataka
            if (!bookService.isISBNAlreadyPresent(book.getIsbn())) {
                // Izračun ocjene knjige i spremanje u bazu
                double evaluation = bookService.calculateEvaluation(book);
                book.setEvaluation(evaluation);
                bookService.saveBook(book); // Ovdje se knjiga sprema u bazu
                return ResponseEntity.status(HttpStatus.CREATED).body(book);
            } else {
                // Ako je ISBN već prisutan u bazi podataka
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new ErrorDetails(new Date(), "Conflict", "Book with this ISBN already exists"));
            }
        } else {
            // Ako ISBN nije validan
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorDetails(new Date(), "Bad Request", "Invalid ISBN"));
        }
    }

    // Ostale metode kontrolera
}
