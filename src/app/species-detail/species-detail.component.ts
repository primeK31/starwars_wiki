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
          this.spec = spec.result.properties;
          this.http.get(this.spec.homeworld).subscribe((data: any) => {
            this.homeworld = data.result.properties;
          });
          this.getPeople();
          console.log(spec);
        });
      }
    });
  }

  getPeople(): void {
    this.spec.people.forEach((url: string) => {
      this.http.get(url)
        .subscribe((data: any) => {
          this.people.push(data.result.properties);
        });
      });
  }
}
