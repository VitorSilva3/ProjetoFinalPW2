import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FourOrFourComponent } from './components/four-or-four/four-or-four.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { ChooseGameComponent } from './components/choose-game/choose-game.component';
import { BlackjackComponent } from './components/blackjack/blackjack.component';
import { CryptoGameComponent } from './components/crypto-game/crypto-game.component';

@NgModule({
  declarations: [
    AppComponent,
    FourOrFourComponent,
    NavBarComponent,
    HomeComponent,
    ChooseGameComponent,
    BlackjackComponent,
    CryptoGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
