package com.javaguides.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class OpenLibraryProxyController {

    private final RestTemplate restTemplate;

    @Autowired
    public OpenLibraryProxyController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/api/openlibrary/books")
    public ResponseEntity<Object> getBooks() {
        String url = "https://openlibrary.org/books";
        ResponseEntity<Object> response = restTemplate.getForEntity(url, Object.class);
        return response;
    }
}
