import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../pokemon';
import {ActivatedRoute} from '@angular/router';
import {PokemonService} from '../pokemon.service';
import { Location } from '@angular/common';
import {IMultiSelectOption} from '../dropdown-multiselect/src/dropdown/types';
import {TypeService} from "../type.service";
import {PokemonFilter} from "../pokemon-filter";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  @Input() pokemon: Pokemon;
  optionsModel: string[];
  myOptions: IMultiSelectOption[];
  listPokemons: Pokemon[];
  alertOrigin: any = {
    type: 'danger',
    msg: ''
  };
  alert: any;


  constructor(private route: ActivatedRoute,
              private pokemonService: PokemonService,
              private typeService: TypeService,
              private location: Location) {}

  ngOnInit() {
      this.pokemon = new Pokemon();
      this.getAllPokemons();
      this.getPokemon();
      this.getTypes();

  }

  getPokemon(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (null != id) {
      this.pokemonService.getPokemon(id).subscribe(pokemon => {
        this.pokemon = pokemon;
        this.optionsModel = this.pokemon.types;
      });
    } else {
      this.pokemon = new Pokemon();
    }

  }

  getAllPokemons(): void {
    this.pokemonService.getPokemons(new PokemonFilter()).subscribe(pokemons => this.listPokemons = pokemons);
  }

  getTypes(): void {
    this.typeService.getTypes().subscribe(types => {
      this.convertValues(types);
    });

  }

  convertValues(types: string[]): void {
    this.myOptions = [];
    for (var _i = 0; _i < types.length; _i++) {
      this.myOptions.push({ id: types[_i], name: types[_i] });
    }
  }



  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.pokemon.types = this.optionsModel;
    if (null != this.pokemon.id) {
      this.pokemonService.updatePokemon(this.pokemon).subscribe(
        result => {
          console.log(result)
        },
        error => {
          this.alertOrigin.msg = error.error.message;
          this.alert = this.alertOrigin;

        },
        () => this.goBack());
    } else {
      this.pokemonService.addPokemon(this.pokemon).subscribe(
        result => {
          console.log(result)
        },
        error => {
          this.alertOrigin.msg = error.error.message;
          this.alert = this.alertOrigin;

        },
        () => this.goBack());
    }

  }


  delete(): void {
    this.pokemonService.deletePokemon(this.pokemon).subscribe(() => this.goBack());
  }
}


