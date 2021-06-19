import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoedasService {

  constructor(private httpAsk : HttpClient) { }

  linkBTN = "https://api.cryptonator.com/api/full/btc-eur";
  linkETH = "https://api.cryptonator.com/api/full/eth-eur";

  getInfBtn() {
    return this.httpAsk.get(
      this.linkBTN,
    );
  }

  getInfEth() {
    return this.httpAsk.get(
      this.linkETH,
    );
  }

}
