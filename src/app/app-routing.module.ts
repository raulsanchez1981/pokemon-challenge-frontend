import { NgModule } from '@angular/core';
import {PokemonSearchComponent} from './pokemon-search/pokemon-search.component';
import {RouterModule, Routes} from '@angular/router';
import {PokemonDetailComponent} from './pokemon-detail/pokemon-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
  { path: 'pokemons', component: PokemonSearchComponent },
  { path: 'detail/:id', component: PokemonDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
