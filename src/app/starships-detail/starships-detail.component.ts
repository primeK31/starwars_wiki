import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FilmService } from '../film.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-starships-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './starships-detail.component.html',
  styleUrl: './starships-detail.component.css'
})
export class StarshipsDetailComponent {
  starship: any;
  people: any[] = [];
  films: any[] = [];
  constructor(private route: ActivatedRoute, private filmService: FilmService, private http: HttpClient){ }
  
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        const postId = Number(params.get('id'));
        this.filmService.getStarshipById(postId).subscribe((starship) => {
          this.starship = starship.result.properties;
          this.getPeople();
          console.log(starship);
        });
      }
    });
  }
  getPeople(): void {
    this.starship.pilots.forEach((url: string) => {
      this.http.get(url)
        .subscribe((data: any) => {
          this.people.push(data.result.properties);
        });
      });
  }
}
