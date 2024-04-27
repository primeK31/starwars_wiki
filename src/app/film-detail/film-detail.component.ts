import { Component, NgModule } from '@angular/core';
import { FilmService } from '../film.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './film-detail.component.html',
  styleUrl: './film-detail.component.css'
})
export class FilmDetailComponent {
  film: any;
  people: any[] = [];
  planets: any[] = [];
  starships: any[] = [];
  vehicles: any[] = [];
  species: any[] = [];
  constructor(private route: ActivatedRoute, private filmService: FilmService, private http: HttpClient){ }
  
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        const postId = Number(params.get('id'));
        this.filmService.getFilmById(postId).subscribe((film) => {
          this.film = film.result.properties;
          this.getPeople();
          this.getPlanets();
          this.getStarships();
          this.getVehicles();
          this.getSpecies();
          console.log(film);
        });
      }
    });
  }

  getPeople(): void {
    this.film.characters.forEach((characterUrl: string) => {
      this.http.get(characterUrl)
        .subscribe((data: any) => {
          this.people.push(data.result);
        });
      });
  }
  getPlanets(): void {
    this.film.planets.forEach((url: string) => {
      this.http.get(url)
        .subscribe((data: any) => {
          this.planets.push(data.result);
        });
      });
  }
  getStarships(): void {
    this.film.starships.forEach((url: string) => {
      this.http.get(url)
        .subscribe((data: any) => {
          this.starships.push(data.result);
        });
      });
  }
  getVehicles(): void {
    this.film.vehicles.forEach((url: string) => {
      this.http.get(url)
        .subscribe((data: any) => {
          this.vehicles.push(data.result);
        });
      });
  }
  getSpecies(): void {
    this.film.species.forEach((url: string) => {
      this.http.get(url)
        .subscribe((data: any) => {
          this.species.push(data.result);
        });
      });
  }

}
