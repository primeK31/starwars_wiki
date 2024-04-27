import { Component } from '@angular/core';
import { FilmService } from '../film.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './species.component.html',
  styleUrl: './species.component.css'
})
export class SpeciesComponent {
  species: any[] = [];
  species$: Observable<any> | undefined;
  query = '';
  page = 1;
  baseUrl = "";
  url = "https://swapi.tech/api/species/?page=1&limit=10";
  constructor(private filmService: FilmService, private http: HttpClient)
  { }
  ngOnInit():void {
    this.filmService.getSpecies().subscribe((data) => {
      this.species = data.results; 
      this.species$ = this.http.get(this.url);
      this.baseUrl = this.url;
      console.log(this.baseUrl);
    });
  }

  search(): void {
    this.filmService.searchSpecies(this.query).subscribe((data) => {
      this.species = data.result;
    })
  }


  nextPage() {
    this.species$ = this.http.get(this.baseUrl);
    this.species$.subscribe((data: any) => {
      if(data.next != null) {
        this.page += 1;
        this.baseUrl = data.next;
        console.log('this:' + this.baseUrl + '; prev: ' + this.url);
        this.url = this.baseUrl;
        this.species$ = this.http.get(this.baseUrl);
      }
    });
  }

  prevPage() {
    this.species$ = this.http.get(this.baseUrl);
    this.species$.subscribe((data: any) => {
      if(data.previous != null) {
        this.page -= 1;
        this.baseUrl = data.previous;
        console.log('next:' + this.url + '; this: ' + this.baseUrl);
        this.url = this.baseUrl;
        this.species$ = this.http.get(this.baseUrl);
      }
    });
  }
}
