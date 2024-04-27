import { Component } from '@angular/core';
import { FilmService } from '../film.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.css'
})
export class StarshipsComponent {
  starships: any[] = [];
  starships$: Observable<any> | undefined;
  query = '';
  page = 1;
  baseUrl = "";
  url = "https://swapi.tech/api/starships/?page=1&limit=10";
  characters$: Observable<any> | undefined;
  constructor(private filmService: FilmService, private http: HttpClient)
  { }
  ngOnInit():void {
    this.filmService.getStarships().subscribe((data) => {
      this.starships = data.results; 
      this.starships$ = this.http.get(this.url);
      this.baseUrl = this.url;
      console.log(this.baseUrl);
    });
  }

  search(): void {
    this.filmService.searchStarships(this.query).subscribe((data) => {
      this.starships = data.result;
    })
  }
  
  nextPage() {
    this.starships$ = this.http.get(this.baseUrl);
    this.starships$.subscribe((data: any) => {
      if(data.next != null) {
        this.page += 1;
        this.baseUrl = data.next;
        console.log('this:' + this.baseUrl + '; prev: ' + this.url);
        this.url = this.baseUrl;
        this.starships$ = this.http.get(this.baseUrl);
      }
    });
  }

  prevPage() {
    this.starships$ = this.http.get(this.baseUrl);
    this.starships$.subscribe((data: any) => {
      if(data.previous != null) {
        this.page -= 1;
        this.baseUrl = data.previous;
        console.log('next:' + this.url + '; this: ' + this.baseUrl);
        this.url = this.baseUrl;
        this.starships$ = this.http.get(this.baseUrl);
      }
    });
  }
}
