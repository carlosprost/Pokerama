import { Timer, Carta } from "./clases.js";


let numero = [];
let pares = [];
let cartas = [];
let carta1 = null;
let carta2 = null;
let puntos = 0;

export let juegoInciado = false;

/* Funciones Iniciales del Juego */
export function iniciar(nivel, reloj, cantImg, baraja){
    juegoInciado = true;
    let min = 0;
    let seg = 0;
    if(baraja.length == 16){
        min = 0;
        seg = 44;
    }else if(baraja.length == 24){
        min = 1;
        seg = 29;
    }else if(baraja.length == 36){
        min = 1;
        seg = 59;
    }
    generarNumeros(cantImg, nivel);
    contador(reloj, min, seg, nivel);
}


/* Genera cartas aleatorias para el juego */
function generarNumeros(cant, nivel){
    for( let i = 0; i <= cant * 2; i++){
        for(let x = 0; x < cant * 2; x++){
            let carta = Math.floor(Math.random()*(cant+1));
            if(!numero.includes(carta) && carta != 0){
                numero.push(carta);
                numero.push(carta);
            }
        }
    }
    if(numero.length != cant * 2){
        let carta = Math.floor(Math.random()*cant);
            if(!numero.includes(carta) && carta != 0){
                numero.push(carta);
                numero.push(carta);
            }
    }
    pares = numero.slice(0, nivel * 2);
    generadorDeCartas();
    
}


function generadorDeCartas(){
    let contenido = pares.sort(()=> Math.random() - 0.5);
    for (let i = 0; i < contenido.length; i++) {
        cartas.push(new Carta(contenido[i]));
        
    }
}


/* Reloj de conteo */

function contador(reloj, m, s, nivel){
    let minutos = m; 
    let segundos = s;
    let counter = setInterval(()=>{
        let tiempo = new Timer(minutos, segundos);

        if(esGanador(nivel)){
            clearInterval(counter);
            juegoInciado = false;
            audios('inicio', 'stop');
            audios('win', 'play');
        }else if(esPerdedor(minutos, segundos)){
            clearInterval(counter);
            juegoInciado = false;
        }

        if(segundos > 0){
            segundos--;
        }else if(segundos === 0 && minutos > 0){
            minutos--;
            segundos = 59;
        }
        
        
        reloj.innerText = tiempo.contador;

        
        
    }, 1000);
}

function esGanador(nivel){
    return puntos === nivel;
}
function esPerdedor(m, s){
    return m === 0 && s === 0;
}


/* cambia atributos css de las cartas (imagen delanteras y traseras) */
function cambiarAFront(id){
    let card= document.getElementById(id);
    card.classList.remove('back');
    card.classList.add('front');
    card.style.backgroundImage = `url("../assets/${cartas[id-1]._front}.png")`;
    card.style.backgroundSize = 'contain';
    card.style.backgroundRepeat = 'no-repeat';
    card.style.backgroundPosition = 'center';
}
function cambiarABack(id){
    let card= document.getElementById(id);
    if(card.classList.contains('front')){
        card.classList.remove('front');
    }
    card.classList.add('back');
    card.style.backgroundImage = `url("../assets/back.jpg")`;
    card.style.backgroundSize = 'cover';
    card.style.backgroundRepeat = 'no-repeat';
    card.style.backgroundPosition = 'center';
}


/* Audios */

export function audios(audio, accion){
    const aInicio = new Audio('../assets/sound/inicio.mp3');
    const aWin = new Audio('../assets/sound/win.mp3');
    let acierto = new Audio(elejirAudioAcierto());

    switch(audio){
        case 'inicio':
            accionDeAudio(aInicio, accion);
            break;
        case 'win':
            accionDeAudio(aWin, accion);
            break;
        case 'acierto':
            accionDeAudio(acierto, accion);
            break;
    }
}

function elejirAudioAcierto(){
    let opt = Math.floor(Math.random()*3);
    if(opt == 0) opt = 1;
    
    return `../assets/sound/acertar${opt}.mp3`;
}

function accionDeAudio(audio, accion, volumen = 1.0){
    switch(accion){
        case 'play':
            audio.play();
            break;
        case 'stop':
            audio.pause();
            break;
        case 'volumen':
            audio.volumen = volumen;
            break;
    }
}




/* Función que revisa las cartas que se seleccionan y realiza accion de comparar */

export function revisarJuego(baraja, puntos){
    baraja.forEach(c =>{
        c.addEventListener('click', (e)=>{
            e.preventDefault();
            
            if(juegoInciado){
                
                if(carta1 === null){
                    cambiarAFront(e.target.id);
                    carta1 = e.target.id;
                    blockCard(carta1);
                }else if(carta2 === null){
                    cambiarAFront(e.target.id);
                    carta2 = e.target.id;
                    blockCard(carta2);
                    if(!comparar(carta1, carta2)){
                        setTimeout(()=>{
                            cambiarABack(carta1);
                            unblockCard(carta1);
                            cambiarABack(carta2);
                            unblockCard(carta2);
                            carta1 = null;
                            carta2 = null;
                        },500);
                    }else{
                        audios('acierto', 'play');
                        sumarPunto(puntos);
                        carta1 = null;
                        carta2 = null;
                    }
                }
            }else{
            }
        });
    });
}

function blockCard(id){
    let card = document.getElementById(id);
    card.classList.add('carta-desabilitada');
}
function unblockCard(id){
    let card = document.getElementById(id);
    card.classList.remove('carta-desabilitada');
}

/* Función de comparación */

function comparar(c1, c2){
    return pares[c1-1] === pares[c2-1];
}

/* Función de sumar punto */
function sumarPunto(p){
    puntos++;
    p.innerText = puntos;
}

