import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Carta } from 'src/app/classes/carta';
import { CartasService } from 'src/app/services/cartas.service';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit {

  @ViewChild('playerCards1') pCard1: ElementRef;
  @ViewChild('playerCards2') pCard2: ElementRef;
  @ViewChild('playerCards3') pCard3: ElementRef;
  @ViewChild('playerCards4') pCard4: ElementRef;
  @ViewChild('dealerCards1') dCard1: ElementRef;
  @ViewChild('dealerCards2') dCard2: ElementRef;
  @ViewChild('dealerCards3') dCard3: ElementRef;
  @ViewChild('dealerCards4') dCard4: ElementRef;

  Decks : CartasService;
  constructor(private cartasService : CartasService) {
    this.Decks = cartasService;
   }

  ngOnInit(): void {
  }

  valor_apostado : number = 0;
  dinheiro_user : number = 200;

  resultado : any;

  dealerCards : any = [];
  playerCards : any = [];

  haveImg : boolean = false;

  playerCard1 : string = "https://opengameart.org/sites/default/files/card%20back%20black.png";

  contar = 0;
  contarDealer =0;

  dCarta1 : Carta;
  dCarta2 : Carta;
  dCarta3 : Carta;
  dCarta4 : Carta;


  pCarta1 : Carta ;
  pCarta2 : Carta ;
  pCarta3 : Carta ;
  pCarta4 : Carta ;

  pontosPlayer : number =0;
  pontosDealer : number =0;


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
      this.Decks.getCards().subscribe(data => {this.resultado=data;console.log(this.resultado);this.criarCartas(this.resultado);this.organize()});

  }



  criarCartas(resultado : any)
  {

    if (this.contar==0)
    {
      this.dCarta1 = new Carta(resultado.cards[0].value,resultado.cards[0].suit,resultado.cards[0].image,this.validarPontos(resultado.cards[0].value));
      this.dCarta2 = new Carta(resultado.cards[1].value,resultado.cards[1].suit,resultado.cards[1].image,this.validarPontos(resultado.cards[1].value));
      this.pCarta1 = new Carta(resultado.cards[2].value,resultado.cards[2].suit,resultado.cards[2].image,this.validarPontos(resultado.cards[2].value));
      this.pCarta2 = new Carta(resultado.cards[3].value,resultado.cards[3].suit,resultado.cards[3].image,this.validarPontos(resultado.cards[3].value));

      this.dealerCards.push(this.dCarta1,this.dCarta2);
      this.playerCards.push(this.pCarta1,this.pCarta2);


    } else if(this.contar ==1)
    {
      this.pCarta3 = new Carta(resultado.cards[0].value,resultado.cards[0].suit,resultado.cards[0].image,this.validarPontos(resultado.cards[0].value));
      this.playerCards.push(this.pCarta3);

    }else if(this.contar ==2)
    {
      this.pCarta4 = new Carta(resultado.cards[0].value,resultado.cards[0].suit,resultado.cards[0].image,this.validarPontos(resultado.cards[0].value));
      this.playerCards.push(this.pCarta4);

    }


    if(this.contarDealer==1)
    {
      this.dCarta3 = new Carta(resultado.cards[0].value,resultado.cards[0].suit,resultado.cards[0].image,this.validarPontos(resultado.cards[0].value));
      this.dealerCards.push(this.dCarta3);
    }
    else if (this.contarDealer ==2)
    {
      this.dCarta4 = new Carta(resultado.cards[0].value,resultado.cards[0].suit,resultado.cards[0].image,this.validarPontos(resultado.cards[0].value));
      this.dealerCards.push(this.dCarta4);
    }

  }


  organize()
  {
      if(this.contar ==0)
      {
        this.dCard1.nativeElement.src = this.dealerCards[0].imagem_url;
        this.pCard1.nativeElement.src = this.playerCards[0].imagem_url;
        this.pCard2.nativeElement.src = this.playerCards[1].imagem_url;

        console.log(this.dealerCards);
        console.log(this.playerCards);
        this.contar = 1;
      } else if (this.contar == 1)
      {
        this.pCard3.nativeElement.src = this.playerCards[2].imagem_url;
        this.contar = 2;
      }else if (this.contar == 2)
      {
        this.pCard4.nativeElement.src = this.playerCards[3].imagem_url;
        this.contar = 3;
      }



  }

  validarPontos(value: string)
  {
    let pontos ;

    if(value == "JACK" || value == "QUEEN" || value == "KING"){
      pontos = 10;
    }else if(value =="ACE")pontos=1; else {
      pontos = Number(value);
    }

    return pontos;
  }

  hit()
  {
    this.Decks.hit().subscribe(data => {this.resultado=data;console.log(this.resultado);this.criarCartas(this.resultado);this.organize();this.PodeContinuar()});
  }

  PodeContinuar()
  {

      this.pontosPlayer = this.contarPontos(this.playerCards);

      if(this.pontosPlayer>21)
        {
          console.log("perdeu");
          this.EndGame("p-lost");
        }

      else if (this.contarDealer ==1)
        {
          this.pontosDealer = this.contarPontos(this.dealerCards);

          if (this.pontosDealer>21)
          {
            console.log("Player ganha");
            this.EndGame("p-win");
          } else if(this.pontosDealer>this.pontosPlayer)
          {
            console.log("Dealer ganhou");
            this.EndGame("p-lost");
          } else if(this.pontosDealer == this.pontosPlayer)
          {
            console.log("empate");
            this.EndGame("draw");
          } else {
            console.log("tira outra carta");
            this.contarDealer = 2;
            this.hit();
          }
        }

      else if (this.contarDealer==2)
      {
        if (this.pontosDealer>21)
        {
          console.log("Player ganha");
          this.EndGame("p-win");
        } else if(this.pontosDealer>this.pontosPlayer)
        {
          console.log("Dealer ganhou");
          this.EndGame("p-lost");
        } else if(this.pontosDealer == this.pontosPlayer)
        {
          console.log("empate");
          this.EndGame("draw");
        } else console.log("puta de baralho fudido o dealer tem 4 cartas e ainda consegue ter menos pontos");


      }

  }


  contarPontos(arrayCartas)
  {
    let temAs = false;
    let temOutro = false;

    let pontos=0;

    for(let i =0;i<arrayCartas.length; i++)
    {
      if(arrayCartas[i].valor=="ACE"){
        temAs = true;
      }
      if(arrayCartas[i].valor=="JACK" || arrayCartas[i].valor=="QUEEN" || arrayCartas[i].valor=="KING"){
        temOutro = true;
      }
      pontos += arrayCartas[i].pontos;
      console.log("Pontos : "+pontos);
    }

    if(temAs == true && temOutro == true)
    {
      pontos +=10;
    }

    return pontos;
  }

  stand()
  {
    console.log('stand btn');

    this.pontosDealer = this.contarPontos(this.dealerCards);
    this.pontosPlayer = this.contarPontos(this.playerCards);

    console.log(this.pontosDealer);
    console.log(this.pontosPlayer);


    if(this.pontosDealer> this.pontosPlayer){
      this.EndGame("p-lost");
    } else if(this.pontosDealer== this.pontosPlayer || this.pontosDealer<this.pontosPlayer)
    {
      console.log('dealer precisa tirar mais uma carta');
      this.contarDealer = 1;
      this.hit();
    }

  }



  EndGame(result : string)
  {
      if(result == "p-win")
      {
        console.log("Player ganhou")
      } else if (result == "p-lost"){

        console.log("Player perdeu");

      } else if (result == "draw")
      {
        console.log("Empate");
      }


      console.log("Pontos dealer: "+this.pontosDealer);
      console.log("Pontos player: "+this.pontosPlayer);

      console.log(this.dealerCards);
      console.log(this.playerCards);

      if (this.dealerCards.length ==2)
      {
        this.dCard2.nativeElement.src = this.dealerCards[1].imagem_url;
      }
      if (this.dealerCards.length ==3)
      {
        this.dCard3.nativeElement.src = this.dealerCards[2].imagem_url;
      }

      if (this.dealerCards.length ==4)
      {
        this.dCard4.nativeElement.src = this.dealerCards[3].imagem_url;
      }


  }

}
