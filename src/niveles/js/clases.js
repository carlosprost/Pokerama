export class Timer {
  constructor(reloj) {
    this.minutos = 0;
    this.segundos = 0;
    this.tiempo = "";
    this.interval = null;
    this.reloj = reloj;
  }

  timer() {
    this.interval = setInterval(() => {
      if (this.segundos < 60) {
        this.segundos += 1;
      } else {
        this.minutos += 1;
        this.segundos = 0;
      }

      this.reloj.innerText = this.getTimer();
    }, 1000);
  }

  getTimer() {
    let m = this.minutos;
    let s = this.segundos;

    if (this.minutos < 10) {
      m = "0" + this.minutos;
    }

    if (this.segundos < 10) {
      s = "0" + this.segundos;
    }
    this.tiempo = `${m}:${s}`;

    return this.tiempo;
  }

  stopTime() {
    clearInterval(this.interval);
  }

  resetTime() {
    clearInterval(this.interval);
    this.minutos = 0;
    this.segundos = 0;
    this.tiempo = "00:00";
  }
}

export class Puntos {
  constructor(puntaje) {
    this.puntos = 0;
    this.contenedor = puntaje;
    this.mostrarPuntos();
  }

  getPuntos() {
    return this.puntos;
  }
  sumarPuntos() {
    this.puntos += 1;
  }

  mostrarPuntos() {
    this.contenedor.innerText = this.getPuntos();
  }
}

export class Carta {
  constructor(front) {
    this._front = front;
    this._url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this._front}.png`;
  }

  getFront() {
    return `<img src="${this._url}" alt="pokemon">`;
  }
}
