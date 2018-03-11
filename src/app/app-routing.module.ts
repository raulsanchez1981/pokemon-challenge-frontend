import { NgModule } from '@angular/core';
import {PokemonSearchComponent} from './pokemon-search/pokemon-search.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
  { path: 'pokemons', component: PokemonSearchComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
