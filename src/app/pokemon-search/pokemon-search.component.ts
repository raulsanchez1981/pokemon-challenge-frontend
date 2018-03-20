import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import {PokemonFilter} from '../pokemon-filter';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: [ './pokemon-search.component.css' ]
})
export class PokemonSearchComponent implements OnInit {
  pokemons: Pokemon[];
  favourite: boolean;

  constructor(private pokemonService: PokemonService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    var pok = new PokemonFilter();
    pok.name = term;
    if (this.favourite) {
      pok.favourite = this.favourite;
    }
    this.getPokemons(pok);
  }

  ngOnInit(): void {
    this.getPokemons(new PokemonFilter());
  }

  getPokemons(pokemonFilter: PokemonFilter): void {
    this.pokemonService.getPokemons(pokemonFilter)
      .subscribe(pokemons => this.pokemons = pokemons);
  }


}
