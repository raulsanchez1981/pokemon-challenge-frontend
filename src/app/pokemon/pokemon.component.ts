import { Component, OnInit } from '@angular/core';

import { Pokemon} from '../pokemon';
import { PokemonService} from '../pokemon.service';
import {PokemonFilter} from '../pokemon-filter';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemons: Pokemon[];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons(new PokemonFilter())
      .subscribe(pokemons => this.pokemons = pokemons);
  }
  //
  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.pokemonService.addHero({ name } as Hero)
  //     .subscribe(pokemon => {
  //       this.pokemons.push(pokemon);
  //     });
  // }
  //
  // delete(pokemon: Hero): void {
  //   this.pokemons = this.pokemons.filter(h => h !== pokemon);
  //   this.pokemonService.deleteHero(pokemon).subscribe();
  // }

}
