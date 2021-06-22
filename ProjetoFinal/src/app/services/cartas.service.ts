import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  constructor(private httpAsk : HttpClient) { }

link_pedido_baralho = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

baralho_id: string;

  link_pedido_cartas;
  link_pedido_hit;
  link_pedido_shuffle;


  getBaralho(){
    return this.httpAsk.get(
      this.link_pedido_baralho,
      );
  }
  getCards(){
    this.link_pedido_cartas = `https://deckofcardsapi.com/api/deck/${this.baralho_id}/draw/?count=4`;
    return this.httpAsk.get(
      this.link_pedido_cartas,
      );
  }


  hit(){
    this.link_pedido_hit = `https://deckofcardsapi.com/api/deck/${this.baralho_id}/draw/?count=1`;
    return this.httpAsk.get(
      this.link_pedido_hit,
      );
  }

  shuffle()
  {
    this.link_pedido_shuffle = `https://deckofcardsapi.com/api/deck/${this.baralho_id}/shuffle/`;
    return this.httpAsk.get(
      this.link_pedido_shuffle,
      );
  }
}

