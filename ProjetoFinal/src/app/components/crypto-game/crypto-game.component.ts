import { Component, OnInit } from '@angular/core';
import { Moedas } from 'src/app/classes/moedas';
import { MoedasService } from 'src/app/services/moedas.service';

@Component({
  selector: 'app-crypto-game',
  templateUrl: './crypto-game.component.html',
  styleUrls: ['./crypto-game.component.css']
})
export class CryptoGameComponent implements OnInit {

  constructor(private moedas : MoedasService) { }

  ngOnInit(): void {
  }

  informacoes;

  btn() {
    this.moedas.getInfBtn().subscribe(
      data => {this.informacoes = data['ticker']//.map(x => new Moedas(x))
      console.log(data);
      console.log(this.informacoes);
      }
    );
  }

  eth() {
    this.moedas.getInfEth().subscribe(
      data => this.informacoes = data);
    console.log(this.informacoes);
  }

}
