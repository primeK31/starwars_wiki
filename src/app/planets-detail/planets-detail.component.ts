import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FilmService } from '../film.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-planets-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './planets-detail.component.html',
  styleUrl: './planets-detail.component.css'
})
export class PlanetsDetailComponent {
  planet: any;
  people: any[] = [];
  films: any[] = [];
  constructor(private route: ActivatedRoute, private filmService: FilmService, private http: HttpClient){ }
  
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        const postId = Number(params.get('id'));
        this.filmService.getPlanetById(postId).subscribe((film) => {
          this.planet = film;
          this.getPeople();
          this.getFilms();
          console.log(film);
        });
      }
    });
  }
  getPeople(): void {
    this.planet.residents.forEach((url: string) => {
      this.http.get(url)
        .subscribe((data: any) => {
          this.people.push(data);
        });
      });
  }
  getFilms(): void {
    this.planet.films.forEach((url: string) => {
      this.http.get(url)
        .subscribe((data: any) => {
          this.films.push(data);
        });
      });
  }
}
