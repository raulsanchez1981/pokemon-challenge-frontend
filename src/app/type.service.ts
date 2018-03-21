import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import {Pokemon} from './pokemon';
import {PokemonFilter} from './pokemon-filter';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TypeService {

  private pokemonUrl = 'https://pokemon-challenge.herokuapp.com/challenge/type';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Pokemons from the server */
  getTypes (): Observable<string[]> {
    const url = this.pokemonUrl+"/search";
    return this.http.get<string[]>(url, httpOptions);

  }


  /** Log a PokemonService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PokemonService: ' + message);
  }
}




