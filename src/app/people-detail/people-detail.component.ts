import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FilmService } from '../film.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-people-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './people-detail.component.html',
  styleUrl: './people-detail.component.css'
})

export class PeopleDetailComponent {
  people: any;
  films: any[] = [];
  species: any[] = [];
  vehicles: any[] = [];
  starships: any[] = [];
  homeworld: any;
  constructor(private route: ActivatedRoute, private filmService: FilmService, private http: HttpClient){ }
  
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        const postId = Number(params.get('id'));
        this.filmService.getPeopleById(postId).subscribe((people) => {
          this.people = people;
          this.http.get(people.homeworld).subscribe((data: any) => {
            this.homeworld = data;
          });
          this.getFilms();
          this.getSpecies();
          this.getVehicles();
          this.getStarships();
          console.log(this.people);
        });
      }
    });
  }

  getFilms(): void {
    this.people.films.forEach((url: string) => {
      this.http.get(url)
        .subscribe((data: any) => {
          this.films.push(data);
        });
      });
  }
  getSpecies(): void {
    this.people.species.forEach((url: string) => {
      this.http.get(url)
        .subscribe((data: any) => {
          this.species.push(data);
        });
      });
  }
  getVehicles(): void {
    this.people.vehicles.forEach((url: string) => {
      this.http.get(url)
        .subscribe((data: any) => {
          this.vehicles.push(data);
        });
      });
  }
  getStarships(): void {
    this.people.starships.forEach((url: string) => {
      this.http.get(url)
        .subscribe((data: any) => {
          this.starships.push(data);
        });
      });
  }
}
