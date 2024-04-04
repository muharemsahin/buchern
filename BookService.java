package com.javaguides.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public void saveBook(Book book) {
        // Izračunajte evaluaciju prije spremanja knjige
        double evaluation = calculateEvaluation(book);
        book.setEvaluation(evaluation);

        // Spremanje knjige u bazu
        bookRepository.save(book);
    }

    public boolean isISBNValid(String isbn) {
        // Implementacija validacije ISBN-a
        return isbn.length() == 13;
    }

    public boolean isISBNAlreadyPresent(String isbn) {
        // Provjera da li je ISBN već prisutan u bazi podataka
        return bookRepository.existsByIsbn(isbn);
    }

    public double calculateEvaluation(Book book) {
        // Implementacija izračuna ocjene knjige
        double baseAmount = 100;
        double factor = calculateFactor(book.getNumberOfPages());
        double additionalAmount = 0;

        if (book.getYearOfPublication() < 1990) {
            additionalAmount += 15;
        }

        if ("German".equalsIgnoreCase(book.getLanguage())) {
            additionalAmount += baseAmount * 0.1;
        }

        return baseAmount * factor + additionalAmount;
    }

    private double calculateFactor(int numberOfPages) {
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

    // Ostale metode servisa
}
