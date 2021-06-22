import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoedasService } from 'src/app/services/moedas.service';

@Component({
  selector: 'app-crypto-game',
  templateUrl: './crypto-game.component.html',
  styleUrls: ['./crypto-game.component.css']
})
export class CryptoGameComponent implements OnInit {

  constructor(private moedas : MoedasService, router : Router) { this.router = router }

  dadosGuar : boolean;
  informacoes;
  precoBtn;
  precoEth;
  ticker;
  mercado;
  contador;
  router : Router;

  ngOnInit(): void {
    this.dadosGuar = localStorage.getItem("Informacoes") ? true : false;

    if (this.dadosGuar == false) {
      this.informacoes = [
        { Dinheiro : 35000,
          Bitcoins : 0,
          BitLucro : 0,
          Ethereum : 0,
          EthLucro : 0
        }
      ];

      localStorage.setItem("Informacoes", JSON.stringify(this.informacoes));
    }
    else {
      this.informacoes = JSON.parse(localStorage.getItem("Informacoes"));
    }

    this.moedas.getInfBtn().subscribe(
      data => {
        this.precoBtn = data['ticker'];
        this.precoBtn.price = Math.round(this.precoBtn.price);
        this.mercado = this.precoBtn['markets'];
        this.moedas.moeda = this.ticker.base;
        clearTimeout(this.contador);
        this.refresh();
        for (let i = 0; i < this.mercado.length; i++) {
          this.mercado[i].price = Math.round(this.mercado[i].price);
        }
      }
    );

    this.moedas.getInfEth().subscribe(
      data => {
        this.precoEth = data['ticker'];
        this.precoEth.price = Math.round(this.precoEth.price);
      }
    );

  }

  btn() {
    this.moedas.getInfBtn().subscribe(
      data => {this.ticker = data['ticker'];
      console.log(this.ticker)
      this.mercado = this.ticker['markets'];
      this.moedas.moeda = this.ticker.base;
      this.arredondar();
      clearTimeout(this.contador);
      this.refresh();
      }
    );
  }

  eth() {
    this.moedas.getInfEth().subscribe(
      data => {this.ticker = data['ticker'];
      console.log(this.ticker)
      this.mercado = this.ticker['markets'];
      this.moedas.moeda = this.ticker.base;
      this.arredondar();
      clearTimeout(this.contador);
      this.refresh();
      }
    );
  }

  arredondar() {
    for (let i = 0; i < this.mercado.length; i++) {
      this.mercado[i].price = Math.round(this.mercado[i].price);
    }
    console.log(this.mercado);
  }

  refresh(){
    this.contador = setTimeout(() => {
      console.log("Entrou");
      if(this.moedas.moeda == 'BTC'){
        this.btn();
        console.log("Atualizou btc");
      }
      else{
        this.eth();
        console.log("Atualizou eth");
      }
    }, 30000);
  }

  comprarVender (loja, preco) {
    this.moedas.preco = preco;
    this.router.navigate(['/cryptoGame', loja]);
  }
}
