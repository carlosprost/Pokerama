export class Timer{
    constructor(minutos, segundos){
        this.minutos = minutos;
        this.segundos = segundos;
        this.tiempo = '0' + this.minutos + ':' + this.segundos;
    }

    get contador(){
        if(this.minutos > 10 && this.segundos > 10){
            this.tiempo = this.minutos + ':' + this.segundos;
        }else if(this.minutos > 10 && this.segundos < 10){
            this.tiempo = this.minutos + ':0' + this.segundos;
        }else if(this.minutos < 10 && this.segundos < 10){
            this.tiempo = '0' + this.minutos + ':0' + this.segundos;
        }
        return this.tiempo;
    }

}


export class Carta{
    
    constructor(front){
        this._back = 'back.png';
        this._front = front;
    }

}




