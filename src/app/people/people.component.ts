import { Component } from '@angular/core';
import { FilmService } from '../film.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent {
  people: any[] = [];
  people$: Observable<any> | undefined;
  query = '';
  page = 1;
  searchQuery = 'https://swapi.dev/api/people/?search='
  baseUrl = "";
  url = "https://swapi.dev/api/people/?page=1";
  characters$: Observable<any> | undefined;
  constructor(private filmService: FilmService, private http: HttpClient)
  { }
  ngOnInit():void {
    this.filmService.getPeople().subscribe((data) => {
      this.people = data.results; 
      this.people$ = this.http.get(this.url);
      this.baseUrl = this.url;
      console.log(this.baseUrl);
    });
  }

  search(): void {
    this.searchQuery = 'https://swapi.dev/api/people/?search=';
    this.searchQuery += this.query;
    this.people$ = this.http.get(this.searchQuery);
  }


  nextPage() {
    this.people$ = this.http.get(this.baseUrl);
    this.people$.subscribe((data: any) => {
      if(data.next != null) {
        this.page += 1;
        this.baseUrl = data.next;
        console.log('this:' + this.baseUrl + '; prev: ' + this.url);
        this.url = this.baseUrl;
        this.people$ = this.http.get(this.baseUrl);
      }
    });
  }

  prevPage() {
    this.people$ = this.http.get(this.baseUrl);
    this.people$.subscribe((data: any) => {
      if(data.previous != null) {
        this.page -= 1;
        this.baseUrl = data.previous;
        console.log('next:' + this.url + '; this: ' + this.baseUrl);
        this.url = this.baseUrl;
        this.people$ = this.http.get(this.baseUrl);
      }
    });
  }
}
