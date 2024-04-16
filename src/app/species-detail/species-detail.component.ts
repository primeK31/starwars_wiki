import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FilmService } from '../film.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-species-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './species-detail.component.html',
  styleUrl: './species-detail.component.css'
})
export class SpeciesDetailComponent {
  spec: any;
  film: any[] = [];
  people: any[] = [];
  homeworld: any;
  constructor(private route: ActivatedRoute, private filmService: FilmService, private http: HttpClient){ }
  
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        const postId = Number(params.get('id'));
        this.filmService.getSpeciesById(postId).subscribe((spec) => {
          this.spec = spec;
          this.http.get(spec.homeworld).subscribe((data: any) => {
            this.homeworld = data;
          });
          this.getFilms();
          this.getPeople();
          console.log(spec);
        });
      }
    });
  }
  getFilms(): void {
    this.spec.films.forEach((url: string) => {
      this.http.get(url)
        .subscribe((data: any) => {
          this.film.push(data);
        });
      });
  }

  getPeople(): void {
    this.spec.people.forEach((url: string) => {
      this.http.get(url)
        .subscribe((data: any) => {
          this.people.push(data);
        });
      });
  }
}
