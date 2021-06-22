import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlackjackComponent } from './components/blackjack/blackjack.component';
import { ChooseGameComponent } from './components/choose-game/choose-game.component';
import { CryptoGameComponent } from './components/crypto-game/crypto-game.component';
import { FilhoComponent } from './components/crypto-game/filho/filho.component';
import { FourOrFourComponent } from './components/four-or-four/four-or-four.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "Home", component: HomeComponent},
  {path: "404", component: FourOrFourComponent},
  {path:"chooseGame",component:ChooseGameComponent},
  {path:"cryptoGame",component:CryptoGameComponent,
  children: [{path: ":Loja", component: FilhoComponent}]
},
  {path:"blackJack",component:BlackjackComponent},
  {path: "**", redirectTo: "404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
