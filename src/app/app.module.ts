import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';
import { PokemonService} from './pokemon.service';
import { MessageService} from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonSearchComponent,
    PokemonComponent,
    PokemonDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PokemonService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
