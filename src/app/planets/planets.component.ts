import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FilmService } from '../film.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.css'
})
export class PlanetsComponent {
  planets: any[] = [];
  planets$: Observable<any> | undefined;
  query = '';
  page = 1;
  searchQuery = 'https://swapi.dev/api/planets/?search='
  baseUrl = "";
  url = "https://swapi.dev/api/planets/?page=1";
  characters$: Observable<any> | undefined;
  constructor(private filmService: FilmService, private http: HttpClient)
  { }

  ngOnInit():void {
    this.filmService.getPlanets().subscribe((data) => {
      this.planets = data.results; 
      this.planets$ = this.http.get(this.url);
      this.baseUrl = this.url;
      console.log(this.baseUrl);
    });
  }

  search(): void {
    this.searchQuery = 'https://swapi.dev/api/planets/?search=';
    this.searchQuery += this.query;
    this.planets$ = this.http.get(this.searchQuery);
  }


  nextPage() {
    this.planets$ = this.http.get(this.baseUrl);
    this.planets$.subscribe((data: any) => {
      if(data.next != null) {
        this.page += 1;
        this.baseUrl = data.next;
        console.log('this:' + this.baseUrl + '; prev: ' + this.url);
        this.url = this.baseUrl;
        this.planets$ = this.http.get(this.baseUrl);
      }
    });
  }

  prevPage() {
    this.planets$ = this.http.get(this.baseUrl);
    this.planets$.subscribe((data: any) => {
      if(data.previous != null) {
        this.page -= 1;
        this.baseUrl = data.previous;
        console.log('next:' + this.url + '; this: ' + this.baseUrl);
        this.url = this.baseUrl;
        this.planets$ = this.http.get(this.baseUrl);
      }
    });
  }
}
