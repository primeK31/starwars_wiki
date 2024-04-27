import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  baseUrl = "https://swapi.tech/api"

  constructor(private http: HttpClient) {  }

  getFilms():Observable<any> {
    return this.http.get(`${this.baseUrl}/films`);
  }

  getFilmById(id: number):Observable<any> {
    return this.http.get(`${this.baseUrl}/films/${id}/`);
  }

  getbyUrl(url: string):Observable<any> {
    return this.http.get(url);
  }

  getPeople():Observable<any> {
    return this.http.get(`${this.baseUrl}/people`);
  }

  getPeopleById(id: number):Observable<any> {
    return this.http.get(`${this.baseUrl}/people/${id}/`);
  }

  getPlanets():Observable<any> {
    return this.http.get(`${this.baseUrl}/planets`);
  }

  getPlanetById(id: number):Observable<any> {
    return this.http.get(`${this.baseUrl}/planets/${id}/`);
  }

  getSpecies():Observable<any> {
    return this.http.get(`${this.baseUrl}/species`);
  }

  getSpeciesById(id: number):Observable<any> {
    return this.http.get(`${this.baseUrl}/species/${id}/`);
  }

  getStarships():Observable<any> {
    return this.http.get(`${this.baseUrl}/starships`);
  }

  getStarshipById(id: number):Observable<any> {
    return this.http.get(`${this.baseUrl}/starships/${id}/`);
  }

  getVehicles():Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicles`);
  }

  getVehicleById(id: number):Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicles/${id}/`);
  }

  searchPeople(name: string):Observable<any> {
    return this.http.get(`${this.baseUrl}/people/?name=${name}`);
  }

  searchPlanets(name: string):Observable<any> {
    return this.http.get(`${this.baseUrl}/planets/?name=${name}`);
  }

  searchSpecies(name: string):Observable<any> {
    return this.http.get(`${this.baseUrl}/species/?name=${name}`);
  }

  searchStarships(name: string):Observable<any> {
    return this.http.get(`${this.baseUrl}/starships/?name=${name}`);
  }

  searchVehicles(name: string):Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicles/?name=${name}`);
  }
  
}
