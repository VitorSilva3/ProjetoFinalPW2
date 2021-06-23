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
  btcInf;
  ethInf;
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

    this.eth();
    this.btc();

  }

  btc() {
    this.moedas.getInfBtn().subscribe(
      data => {this.btcInf = data['ticker'];
      this.btcInf.price = Math.round(this.btcInf.price);
      this.mercado = this.btcInf['markets'];
      this.moedas.moeda = this.btcInf.base;
      this.arredondar();
      clearTimeout(this.contador);
      this.refresh();
      }
    );
  }

  eth() {
    this.moedas.getInfEth().subscribe(
      data => {this.ethInf = data['ticker'];
      this.ethInf.price = Math.round(this.ethInf.price);
      this.moedas.moeda = this.ethInf.base;
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
    console.log(this.moedas.moeda)
    console.log("Ativou")
    this.contador = setTimeout(() => {
      console.log("Entrou");
      if(this.moedas.moeda == 'BTC'){
        this.btc();
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

  sair() {
    this.router.navigate(["/chooseGame"]);
  }
}
