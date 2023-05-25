import { Timer, Puntos, Carta } from "./clases.js";

let numero = [];
let pares = [];
let cartas = [];
let carta1 = null;
let carta2 = null;
let puntos = null;

let timer = null;

export let juegoInciado = false;

/* Funciones Iniciales del Juego */
export function iniciar(nivel, reloj, puntaje) {
  juegoInciado = true;

  generarNumeros(nivel);
  contador(reloj);
  puntos = new Puntos(puntaje);
}

/* Genera cartas aleatorias para el juego */
function generarNumeros(nivel) {
  for (let i = 0; i <= nivel * 2; i++) {
    incluirNumeroDeCarta(nivel * 2);
  }
  console.log('nivel ', nivel);
  pares = numero.slice(0, nivel * 2);
  console.log('Pares de cartas ', pares);
  generadorDeCartas();
}

function incluirNumeroDeCarta(cant) {
  let carta = Math.floor(Math.random() * cant + 1);
  if (!numero.includes(carta) && carta != 0) {
    numero.push(carta);
    numero.push(carta);
  }
}

function generadorDeCartas() {
  let contenido = pares.sort(() => Math.random() - 0.5);
  console.log('Cartas aleatorias', contenido);
  for (let i = 0; i < contenido.length; i++) {
    cartas.push(new Carta(contenido[i]));
  }
}

/* Reloj de conteo */

function contador(reloj) {
  timer = new Timer(reloj);
  timer.timer();
}

/* cambia atributos css de las cartas (imagen delanteras y traseras) */
function cambiarAFront(id) {
  let card = document.getElementById(id);
  if (card.classList.contains("back")) {
    card.classList.remove("back");
  }
  card.classList.add("front");
  card.style.backgroundImage = `url("../assets/${cartas[id - 1].getFront()}.webp")`;
  card.style.backgroundSize = "contain";
  card.style.backgroundRepeat = "no-repeat";
  card.style.backgroundPosition = "center";
}
function cambiarABack(id) {
  let card = document.getElementById(id);
  if (card.classList.contains("front")) {
    card.classList.remove("front");
  }
  card.classList.add("back");
  card.style.backgroundImage = `url("../assets/back.jpg")`;
  card.style.backgroundSize = "cover";
}

/* Audios */

export function audios(audio, accion) {
  let audioSelect = new Audio(`../assets/sound/${audio}.mp3`);
  accionDeAudio(audioSelect, accion);
}

function audioAcierto(accion) {
  let acierto = new Audio(elejirAudioAcierto());
  accionDeAudio(acierto, accion);
}

function elejirAudioAcierto() {
  let opt = Math.floor(Math.random() * 3);
  if (opt == 0) opt = 1;

  return `../assets/sound/acertar${opt}.mp3`;
}

function accionDeAudio(audio, accion, volumen = 1.0) {

    if(accion === "play"){
        audio.volumen = volumen;
      audio.play();
    }else if(accion === "stop"){
        audio.volumen = volumen;
      audio.pause();
    }
  
}

/* Función que revisa las cartas que se seleccionan y realiza accion de comparar */

export function revisarJuego(baraja, nivel) {
  baraja.forEach((carta) => {
    carta.addEventListener("click", (e) => {
      e.preventDefault(e.target.id);

      if (juegoInciado) {
        llenarCartas(e.target.id);
        compararCartas();
        ganador(nivel);
      }
    });
  });
}

function llenarCartas(id) {
  if (carta1 === null) {
    cambiarAFront(id);
    carta1 = id;
    blockCard(carta1);
  } else if (carta1 != null && carta2 === null) {
    cambiarAFront(id);
    carta2 = id;
    blockCard(carta2);
  }
}

function compararCartas() {
  if (cartasCompletas(carta1, carta2) && comparar(carta1, carta2)) {
    acierto();
  } else if (cartasCompletas(carta1, carta2) && !comparar(carta1, carta2)) {
    desacierto();
  }
}

function acierto() {
  audioAcierto("play");
  puntos.sumarPuntos();
  puntos.mostrarPuntos();
  carta1 = null;
  carta2 = null;
}

function desacierto() {
  setTimeout(() => {
    cambiarABack(carta1);
    unblockCard(carta1);
    cambiarABack(carta2);
    unblockCard(carta2);
    carta1 = null;
    carta2 = null;
  }, 500);
}

function blockCard(id) {
  let card = document.getElementById(id);
  card.classList.add("carta-desabilitada");
}
function unblockCard(id) {
  let card = document.getElementById(id);
  card.classList.remove("carta-desabilitada");
}

/* Función de comparación */
function cartasCompletas(c1, c2) {
  return c1 != null && c2 != null;
}
function comparar(c1, c2) {
  return pares[c1 - 1] === pares[c2 - 1];
}

/* Función que revisa si el jugador gano */

function ganador(nivel) {
  console.log(nivel);
  console.log(puntos.getPuntos());
  console.log(esGanador(nivel));
  if (esGanador(nivel)) {
    console.log("ganaste");
    audios("win", "play");
    timer.stopTime();
  }
}

function esGanador(nivel) {
  return puntos.getPuntos() === nivel;
}
