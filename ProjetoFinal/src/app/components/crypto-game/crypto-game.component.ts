import { Component, OnInit } from '@angular/core';
// import { ConsoleReporter } from 'jasmine';
import { MoedasService } from 'src/app/services/moedas.service';

@Component({
  selector: 'app-crypto-game',
  templateUrl: './crypto-game.component.html',
  styleUrls: ['./crypto-game.component.css']
})
export class CryptoGameComponent implements OnInit {

  constructor(private moedas : MoedasService) { }

  dadosGuar : boolean;
  informacoes;
  precoBtn;
  precoEth;
  ticker;
  mercado: Array<any> = [];

  ngOnInit(): void {
    this.dadosGuar = localStorage.getItem("Informacoes") ? true : false;

    if (this.dadosGuar == false) {
      this.informacoes = [
        { Dinheiro : 35000,
          Bitcoins : 0,
          Ethereum : 0
        }
      ];

      localStorage.setItem("Informacoes", JSON.stringify(this.informacoes));
    }
    else {
      this.informacoes = JSON.parse(localStorage.getItem("Informacoes"));
      console.log("Deu");
      console.log(this.informacoes);
    }

    this.moedas.getInfBtn().subscribe(
      data => {
        this.precoBtn = data['ticker'];
      }
    );
    this.moedas.getInfEth().subscribe(
      data => {
        this.precoEth = data['ticker'];
      }
    );

    this.moedas.getInfBtn().subscribe(
      data => {this.ticker = data['ticker'];
      this.mercado = this.ticker['markets'];
      }
    );

  }

  btn() {
    this.moedas.getInfBtn().subscribe(
      data => {this.ticker = data['ticker'];
      this.mercado = this.ticker['markets'];
      console.log(data);
      console.log(this.ticker);
      console.log(this.mercado);
      }
    );
  }

  eth() {
    this.moedas.getInfEth().subscribe(
      data => {this.ticker = data['ticker'];
      this.mercado = this.ticker['markets'];
      console.log(data);
      console.log(this.ticker);
      console.log(this.mercado);
      }
    );
  }
}
