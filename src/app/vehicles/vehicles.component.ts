import { Component } from '@angular/core';
import { FilmService } from '../film.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { map } from 'rxjs/internal/operators/map';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {
  vehicles: any[] = [];
  searchQuery = 'https://swapi.dev/api/vehicles/?search='
  baseUrl = "";
  query = "";
  url = "https://swapi.dev/api/vehicles/?page=1";
  page = 1;
  vehicles$: Observable<any> | undefined;
  constructor(private filmService: FilmService, private http: HttpClient)
  { }
  ngOnInit():void {
    this.filmService.getVehicles().subscribe((data) => {
      this.vehicles = data.results; 
      this.vehicles$ = this.http.get("https://swapi.dev/api/vehicles/?page=1");
      this.baseUrl = this.url;
      console.log(this.baseUrl);
    });
  }

  search(): void {
    this.searchQuery = 'https://swapi.dev/api/vehicles/?search=';
    this.searchQuery += this.query;
    this.vehicles$ = this.http.get(this.searchQuery);
  }

  nextPage() {
    this.vehicles$ = this.http.get(this.baseUrl);
    this.vehicles$.subscribe((data: any) => {
      if(data.next != null) {
        this.page += 1;
        this.baseUrl = data.next;
        console.log('this:' + this.baseUrl + '; prev: ' + this.url);
        this.url = this.baseUrl;
        this.vehicles$ = this.http.get(this.baseUrl);
      }
    });
  }

  prevPage() {
    this.vehicles$ = this.http.get(this.baseUrl);
    this.vehicles$.subscribe((data: any) => {
      if(data.previous != null) {
        this.page -= 1;
        this.baseUrl = data.previous;
        console.log('next:' + this.url + '; this: ' + this.baseUrl);
        this.url = this.baseUrl;
        this.vehicles$ = this.http.get(this.baseUrl);
      }
    });
  }
}
