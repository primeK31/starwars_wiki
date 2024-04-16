import { Component } from '@angular/core';
import { FilmService } from '../film.service';
import { CommonModule } from '@angular/common';
import { RouterEvent, RouterLink } from '@angular/router';
import { FilmPipe } from '../film.pipe';


@Component({
    selector: 'app-film',
    standalone: true,
    templateUrl: './film.component.html',
    styleUrl: './film.component.css',
    imports: [CommonModule, RouterLink, FilmPipe]
})

export class FilmComponent {
  films: any[] = [];
  constructor(private filmService: FilmService)
  { }
  ngOnInit():void {
    this.filmService.getFilms().subscribe((data) => {
      this.films = data.results; 
      console.log(this.films);
    });
  }
}
