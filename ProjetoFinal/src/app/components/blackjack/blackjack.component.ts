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
  @ViewChild('clearbtn') clearButton: ElementRef;
  @ViewChild('dealbtn') dealButton: ElementRef;
  @ViewChild('hitbtn') hitButton: ElementRef;
  @ViewChild('standbtn') standButton: ElementRef;





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

  canBet = true;


  bet(valor : number)
  {
    if(this.valor_apostado+valor > this.dinheiro_user)
    return;


    if(this.canBet ==false)
    {
      return alert("o tempo para apostar ja acabou");
    }
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
    console.log('clickei aqui')
    if(this.valor_apostado==0)
    {
      return alert("aposta alguma coisa");
    }

    if(this.Decks.baralho_id== undefined)
    {
      let anwser;
      this.Decks.getBaralho().subscribe(data =>{anwser=data;console.log(anwser);this.Decks.baralho_id = anwser.deck_id;console.log(this.Decks.baralho_id);this.Decks.getCards().subscribe(data => {this.resultado=data;console.log(this.resultado);this.validarNCartas(this.resultado);this.criarCartas(this.resultado);this.organize()});});
    }else {
      this.Decks.getCards().subscribe(data => {this.resultado=data;console.log(this.resultado);this.validarNCartas(this.resultado);this.criarCartas(this.resultado);this.organize()});
    }
    this.canBet = false;

      this.hitButton.nativeElement.style.opacity = 100;
      this.standButton.nativeElement.style.opacity = 100;
      this.clearButton.nativeElement.style.opacity = 0;
      this.dealButton.nativeElement.style.opacity =0;
  }

  validarNCartas(resultado:any)
  {
      if(Number(resultado.remaining)<=20)
      {
        this.Decks.shuffle().subscribe(data =>{console.log(data)});
      }
  }

  criarCartas(resultado : any, who?:string)
  {
    console.log(this.contar);
    console.log("Contar dealer:" +this.contarDealer);

    if(who!="dealer")
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
    }
    else{
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

      } else if (this.contar == 1)
      {
        this.pCard3.nativeElement.src = this.playerCards[2].imagem_url;

      }else if (this.contar == 2)
      {
        this.pCard4.nativeElement.src = this.playerCards[3].imagem_url;

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

  resolverBug()
  {
    this.hit("player");
  }
  hit(who? : string )
  {
    if(who=="player")
    {
      this.contar+=1;
      this.Decks.hit().subscribe(data => {this.resultado=data;console.log(this.resultado);this.criarCartas(this.resultado,"player");this.organize();this.PodeContinuar()});

    }else if(who=="dealer")
    {
      this.contarDealer+=1;
      this.Decks.hit().subscribe(data => {this.resultado=data;console.log(this.resultado);this.criarCartas(this.resultado,"dealer");this.organize();this.PodeContinuar()});
    }

  }

  PodeContinuar()
  {

      this.pontosPlayer = this.contarPontos(this.playerCards);
      this.pontosDealer = this.contarPontos(this.dealerCards);

      if(this.pontosPlayer>21)
        {
          console.log("perdeu");
          this.EndGame("Parrebenta");
        }

      else if (this.contarDealer ==1)
        {
          this.pontosDealer = this.contarPontos(this.dealerCards);

          if (this.pontosDealer>21)
          {
            console.log("Player ganha");
            this.EndGame("Darrebenta");
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
            this.hit("dealer");
          }
        }

      else if (this.contarDealer==2)
      {
        if (this.pontosDealer>21)
        {
          console.log("Player ganha");
          this.EndGame("Darrebentou");
        } else if(this.pontosDealer>this.pontosPlayer)
        {
          console.log("Dealer ganhou");
          this.EndGame("p-lost");
        } else if(this.pontosDealer == this.pontosPlayer)
        {
          console.log("empate");
          this.EndGame("draw");
        } else{
          console.log("puta de baralho fudido o dealer tem 4 cartas e ainda consegue ter menos pontos");
          this.EndGame("p-win");
        }


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
      this.hit("dealer");
    }

  }



  EndGame(result : string)
  {



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
        this.dCard2.nativeElement.src = this.dealerCards[1].imagem_url;
        this.dCard3.nativeElement.src = this.dealerCards[2].imagem_url;
      }

      if (this.dealerCards.length ==4)
      {
        this.dCard2.nativeElement.src = this.dealerCards[1].imagem_url;
        this.dCard3.nativeElement.src = this.dealerCards[2].imagem_url;
        this.dCard4.nativeElement.src = this.dealerCards[3].imagem_url;
      }

      if(result == "p-win")
      {
        console.log("Player ganhou")

        this.dinheiro_user += this.valor_apostado;
        alert(`O player ganhou com ${this.pontosPlayer} pontos.`);
      } else if (result == "p-lost"){

        this.dinheiro_user -= this.valor_apostado;
         alert(`O dealer ganhou com ${this.pontosDealer} pontos.`);

      } else if (result == "draw")
      {
        alert(`Que belo empate`);
      } else if (result == "Darrebenta")
      {
        this.dinheiro_user += this.valor_apostado;
        alert(`O dealer arrebentou com ${this.pontosDealer} pontos.`);
      }else if (result == "Parrebenta")
      {
        this.dinheiro_user -= this.valor_apostado;
        alert(`O player arrebentou com ${this.pontosPlayer} pontos.`);
      }

      setTimeout(()=>{this.Restart()},2000);


  }

  Restart()
  {
      this.valor_apostado =0;
      this.canBet = true;
    this.playerCards = [];
    this.dealerCards = [];

      this.dCard1.nativeElement.src = "https://opengameart.org/sites/default/files/card%20back%20black.png";
      this.dCard2.nativeElement.src = "https://opengameart.org/sites/default/files/card%20back%20black.png";
      this.dCard3.nativeElement.src = "https://opengameart.org/sites/default/files/card%20back%20black.png";
      this.dCard4.nativeElement.src = "https://opengameart.org/sites/default/files/card%20back%20black.png";

      this.pCard1.nativeElement.src = "https://opengameart.org/sites/default/files/card%20back%20black.png";
      this.pCard2.nativeElement.src = "https://opengameart.org/sites/default/files/card%20back%20black.png";
      this.pCard3.nativeElement.src = "https://opengameart.org/sites/default/files/card%20back%20black.png";
      this.pCard4.nativeElement.src = "https://opengameart.org/sites/default/files/card%20back%20black.png";

      this.hitButton.nativeElement.style.opacity = 0;
      this.standButton.nativeElement.style.opacity = 0;
      this.clearButton.nativeElement.style.opacity = 100;
      this.dealButton.nativeElement.style.opacity =100;

  }


}
