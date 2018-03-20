import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../pokemon';
import {ActivatedRoute} from '@angular/router';
import {PokemonService} from '../pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  @Input() pokemon: Pokemon;

  constructor(private route: ActivatedRoute,
              private pokemonService: PokemonService,
              private location: Location) {}

  ngOnInit() {
      this.getPokemon();
  }

  getPokemon(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemon(id)
      .subscribe(pokemon => this.pokemon = pokemon);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.pokemonService.updatePokemon(this.pokemon)
      .subscribe(() => this.goBack());
  }
}


