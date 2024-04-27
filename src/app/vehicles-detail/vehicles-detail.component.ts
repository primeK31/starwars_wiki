import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FilmService } from '../film.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vehicles-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vehicles-detail.component.html',
  styleUrl: './vehicles-detail.component.css'
})
export class VehiclesDetailComponent {
  vehicle: any;
  people: any[] = [];
  films: any[] = [];
  constructor(private route: ActivatedRoute, private filmService: FilmService, private http: HttpClient){ }
  
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        const postId = Number(params.get('id'));
        this.filmService.getVehicleById(postId).subscribe((vehicle) => {
          this.vehicle = vehicle.result.properties;
          this.getPeople();
          this.getFilms();
          console.log(vehicle);
        });
      }
    });
  }
  getPeople(): void {
    this.vehicle.pilots.forEach((url: string) => {
      this.http.get(url)
        .subscribe((data: any) => {
          this.people.push(data.result.properties);
        });
      });
  }
  getFilms(): void {
    this.vehicle.films.forEach((url: string) => {
      this.http.get(url)
        .subscribe((data: any) => {
          this.films.push(data.result.properties);
        });
      });
  }
}
