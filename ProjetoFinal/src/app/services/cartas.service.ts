import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  constructor(private httpAsk : HttpClient) { }


  link_pedido_cartas = "https://deckofcardsapi.com/api/deck/kcnvzi7fbyo4/draw/?count=4";
  link_pedido_shuffle = "https://deckofcardsapi.com/api/deck/kcnvzi7fbyo4/shuffle/";

  getCards(){
    return this.httpAsk.get(
      this.link_pedido_cartas,
      );
  }

  shuffle()
  {
    return this.httpAsk.get(
      this.link_pedido_shuffle,
      );
  }
}

