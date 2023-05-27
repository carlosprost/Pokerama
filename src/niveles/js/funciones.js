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
  for (let i = 0; i <= 240; i++) {
    incluirNumeroDeCarta(240);
  }
  pares = numero.slice(0, nivel * 2);
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
function darVueltaLaCarta(id) {
  let card = document.getElementById(id);
  if (card.classList.contains("back")) {
    card.classList.replace("back", "front");
    card.innerHTML = cartas[id - 1].getFront();
    card.style.backgroundImage = `none`;
  } else {
    card.classList.replace("front", "back");
    card.style.backgroundImage = `url("../assets/back.jpg")`;
    card.innerHTML = "";
  }
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
  if (accion === "play") {
    audio.volumen = volumen;
    audio.play();
  } else if (accion === "stop") {
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
    carta1 = id;
    darVueltaLaCarta(carta1);
    blockCard(carta1);
  } else if (carta1 != null && carta2 === null) {
    carta2 = id;
    darVueltaLaCarta(carta2);
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
    darVueltaLaCarta(carta1);
    blockCard(carta1);
    darVueltaLaCarta(carta2);
    blockCard(carta2);
    carta1 = null;
    carta2 = null;
  }, 1000);
}

function blockCard(id) {
  let card = document.getElementById(id);
  card.classList.toggle("carta-desabilitada");
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
  if (esGanador(nivel)) {
    audios("win", "play");
    timer.stopTime();
  }
}

function esGanador(nivel) {
  return puntos.getPuntos() === nivel;
}
