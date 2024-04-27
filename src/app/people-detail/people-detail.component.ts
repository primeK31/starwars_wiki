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
        this.filmService.getPeopleById(postId).subscribe((data) => {
          this.people = data.result.properties;
          this.http.get(this.people.homeworld).subscribe((data: any) => {
            this.homeworld = data.result.properties;
          });
          console.log(this.people);
        });
      }
    });
  }
}
