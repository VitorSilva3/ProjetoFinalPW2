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
  mercado;
  contador;
  contadorInf;
  infQuant;
  infLucro;
  preco;
  router : Router;

  ngOnInit(): void {

    this.eth();
    this.btc();

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
      this.buscarInf();
    }

  }

  // para sair do jogo
  sair() {
    this.router.navigate(["/chooseGame"]);
  }

  // buscar informações do jogador
  buscarInf() {
    this.informacoes = JSON.parse(localStorage.getItem("Informacoes"));
    if (this.moedas.moeda == 'BTC') {
      this.infQuant = this.informacoes[0].Bitcoins;
      this.infLucro = this.informacoes[0].BitLucro;
    }
    else {
      this.infQuant = this.informacoes[0].Ethereum;
      this.infLucro = this.informacoes[0].EthLucro;
    }
    clearTimeout(this.contadorInf);
    this.refreshInf();
  }

  // fazer novas buscas às informações do jogador
  refreshInf(){
    this.contadorInf = setTimeout(() => {
      this.buscarInf();
    }, 1000);
  }

  // buscar informações da bitcoin
  btc() {
    this.moedas.getInfBtn().subscribe(
      data => {this.preco = data['ticker'];
      this.preco.price = Math.round(this.preco.price);
      this.mercado = this.preco['markets'];
      this.moedas.moeda = this.preco.base;
      this.arredondar();
      clearTimeout(this.contador);
      this.refresh();
      }
    );
  }

  // buscar informações da ethereum
  eth() {
    this.moedas.getInfEth().subscribe(
      data => {this.preco = data['ticker'];
      this.preco.price = Math.round(this.preco.price);
      this.mercado = this.preco['markets'];
      this.moedas.moeda = this.preco.base;
      this.arredondar();
      clearTimeout(this.contador);
      this.refresh();
      }
    );
  }

  // arredonda os preços das moedas
  arredondar() {
    for (let i = 0; i < this.mercado.length; i++) {
      this.mercado[i].price = Math.round(this.mercado[i].price);
    }
  }

  // recarrega as informações das moedas
  refresh(){
    this.contador = setTimeout(() => {
      if(this.moedas.moeda == 'BTC'){
        this.btc();
      }
      else{
        this.eth();
      }
    }, 30000);
  }

  // abre uma janela para comprar ou vender as moedas
  comprarVender (loja, preco) {
    this.moedas.preco = preco;
    this.router.navigate(['/cryptoGame', loja]);
  }
}
