import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FilmComponent } from './film/film.component';
import { PeopleComponent } from './people/people.component';
import { PlanetsComponent } from './planets/planets.component';
import { SpeciesComponent } from './species/species.component';
import { StarshipsComponent } from './starships/starships.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { PeopleDetailComponent } from './people-detail/people-detail.component';
import { PlanetsDetailComponent } from './planets-detail/planets-detail.component';
import { SpeciesDetailComponent } from './species-detail/species-detail.component';
import { StarshipsDetailComponent } from './starships-detail/starships-detail.component';
import { VehiclesDetailComponent } from './vehicles-detail/vehicles-detail.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent }, 
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'films', component: FilmComponent },
    { path: 'films/:id', component: FilmDetailComponent },
    { path: 'people', component: PeopleComponent},
    { path: 'people/:id', component: PeopleDetailComponent},
    { path: 'planets', component: PlanetsComponent},
    { path: 'planets/:id', component: PlanetsDetailComponent},
    { path: 'species', component: SpeciesComponent},
    { path: 'species/:id', component: SpeciesDetailComponent},
    { path: 'starships', component: StarshipsComponent},
    { path: 'starships/:id', component: StarshipsDetailComponent},
    { path: 'vehicles', component: VehiclesComponent},
    { path: 'vehicles/:id', component: VehiclesDetailComponent},
];
