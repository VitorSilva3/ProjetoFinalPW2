import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoedasService } from 'src/app/services/moedas.service';

@Component({
  selector: 'app-filho',
  templateUrl: './filho.component.html',
  styleUrls: ['./filho.component.css']
})
export class FilhoComponent implements OnInit {

  constructor(private activeRoute : ActivatedRoute, private moedas : MoedasService, router : Router) { this.router = router }

  loja;
  moeda;
  preco;
  informacoes;
  router :Router;

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params =>{
        this.loja = params.Loja;
      });

      this.moeda = this.moedas.moeda;
      this.preco = this.moedas.preco;

  }

  sair() {
    this.router.navigate(['cryptoGame']);
  }

  comprar() {
    this.informacoes = JSON.parse(localStorage.getItem("Informacoes"));
    if (this.moeda == 'BTC') {
      if (this.informacoes[0].Dinheiro > this.preco) {
        this.informacoes[0].Bitcoins++
        this.informacoes[0].BitLucro = this.informacoes[0].BitLucro - this.preco;
        this.informacoes[0].Dinheiro = this.informacoes[0].Dinheiro - this.preco;
        localStorage.setItem("Informacoes", JSON.stringify(this.informacoes));
      }
      else {
        alert("Estás falido, não consegues comprar!");
      }
    }
    else {
      if (this.informacoes[0].Dinheiro > this.preco) {
        this.informacoes[0].Ethereum++
        this.informacoes[0].EthLucro = this.informacoes[0].EthLucro - this.preco;
        this.informacoes[0].Dinheiro = this.informacoes[0].Dinheiro - this.preco;
        localStorage.setItem("Informacoes", JSON.stringify(this.informacoes));
      }
      else {
        alert("Estás falido, não consegues comprar!");
      }
    }
  }

  vender() {
    this.informacoes = JSON.parse(localStorage.getItem("Informacoes"));
    if (this.moeda == 'BTC') {
      if (this.informacoes[0].Bitcoins > 0) {
        this.informacoes[0].Bitcoins--
        this.informacoes[0].BitLucro = this.informacoes[0].BitLucro + this.preco;
        this.informacoes[0].Dinheiro = this.informacoes[0].Dinheiro + this.preco;
        localStorage.setItem("Informacoes", JSON.stringify(this.informacoes));
      }
      else {
        alert("Quem me dera poder vender coisas que não tenho!");
      }
    }
    else {
      if (this.informacoes[0].Ethereum > 0) {
        this.informacoes[0].Ethereum--
        this.informacoes[0].EthLucro = this.informacoes[0].EthLucro + this.preco;
        this.informacoes[0].Dinheiro = this.informacoes[0].Dinheiro + this.preco;
        localStorage.setItem("Informacoes", JSON.stringify(this.informacoes));
      }
      else {
        alert("Quem me dera poder vender coisas que não tenho!");
      }
    }
  }
}
