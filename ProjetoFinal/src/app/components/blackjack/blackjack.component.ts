import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartasService } from 'src/app/services/cartas.service';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit {

  @ViewChild('playerCards1') pCard1: ElementRef;

  Decks : CartasService;
  constructor(private cartasService : CartasService) {
    this.Decks = cartasService;
   }

  ngOnInit(): void {
  }
  falas : string ="Bem vindo Bruno Mendes ou Vitor Silva, queres um gelado?";

  valor_apostado : number = 0;
  dinheiro_user : number = 200;

  resultado : any;

  dealerCards : any = [];
  playerCards : any = [];

  haveImg : boolean = false;

  playerCard1 : string = "https://opengameart.org/sites/default/files/card%20back%20black.png";


  bet(valor : number)
  {
    if(this.valor_apostado+valor > this.dinheiro_user)
    return;


      this.valor_apostado += valor;
      console.log('Apostou : '+valor);
      console.log('Valor da aposta: '+this.valor_apostado);
  }
  clearBet()
  {
    this.valor_apostado =0;
  }

  deal()
  {
      this.Decks.getCards().subscribe(data => {this.resultado=data;console.log(this.resultado);this.dealerCards.push(this.resultado.cards[0],this.resultado.cards[1]);this.playerCards.push(this.resultado.cards[2],this.resultado.cards[3]);this.organize()});

  }

  organize()
  {
    this.haveImg = true;

    this.pCard1.nativeElement.src = this.playerCards[0].image;
    console.log(this.dealerCards);
    console.log(this.playerCards);


  }

  hit()
  {

  }

  stand()
  {

  }

}
