export class Carta {

    valor : string;
    pinta : string;
    imagem_url : string;
    pontos : number;

    constructor(value: string, suit: string, image: string, points: number) {
      this.valor = value;
      this.pinta = suit;
      this.imagem_url = image;
      this.pontos = points;
    }
}
