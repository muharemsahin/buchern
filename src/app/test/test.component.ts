import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8080/api/books').subscribe(
      (response) => {
        console.log('Odgovor sa servera:', response);
        // Očekujemo da response sadrži podatke o knjigama
      },
      (error) => {
        console.error('Greška prilikom dohvatanja knjiga:', error);
      }
    );
    
  }
}
