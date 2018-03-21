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
export class PokemonService {

  private pokemonUrl = 'https://pokemon-challenge.herokuapp.com/challenge/pokemon';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Pokemons from the server */
  getPokemons (filter: PokemonFilter): Observable<Pokemon[]> {
    const url = this.pokemonUrl+"/search";
    return this.http.post<Pokemon[]>(url, filter, httpOptions)
      .pipe(
        tap(pokemons => this.log(`fetched pokemons`)),
        catchError(this.handleError('getPokemons', []))
      );
  }

  /** GET Pokemon by id. Will 404 if id not found */
  getPokemon(id: string): Observable<Pokemon> {
    const url = `${this.pokemonUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new pokemon to the server */
  addPokemon (pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.pokemonUrl, pokemon, httpOptions);
  }

  /** DELETE: delete the pokemon from the server */
  deletePokemon (pokemon: Pokemon | number): Observable<Pokemon> {
    const id = typeof pokemon === 'number' ? pokemon : pokemon.id;
    const url = `${this.pokemonUrl}/${id}`;

    return this.http.delete<Pokemon>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>('deletePokemon'))
    );
  }

  /** PUT: update the pokemon on the server */
  updatePokemon (pokemon: Pokemon): Observable<any> {
    return this.http.put(this.pokemonUrl, pokemon, httpOptions);
  }


  /** PUT: make favourite the pokemon on the server */
  makeFavouritePokemon (id: string): Observable<any> {
    const url = `${this.pokemonUrl}/favourite/make/${id}`;
    return this.http.put(this.pokemonUrl, id, httpOptions).pipe(
      tap(_ => this.log(`make favourite pokemon id=${id}`)),
      catchError(this.handleError<any>('makeFavouritePokemon'))
    );
  }

  /** PUT: unmake favourite the pokemon on the server */
  unmakeFavouritePokemon (id: string): Observable<any> {
    const url = `${this.pokemonUrl}/favourite/unmake/${id}`;
    return this.http.put(this.pokemonUrl, id, httpOptions).pipe(
      tap(_ => this.log(`unmake favourite pokemon id=${id}`)),
      catchError(this.handleError<any>('unmakeFavouritePokemon'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PokemonService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PokemonService: ' + message);
  }
}




