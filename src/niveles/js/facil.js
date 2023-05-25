/* Importaciones necesarias */
import { iniciar, revisarJuego, juegoInciado, audios } from "./funciones.js";

/* Variables Golbales */
const NIVEL = 8;

const reloj = document.getElementById("reloj");
const start = document.getElementById("start");
const restart = document.getElementById("restart");
const baraja = document.querySelectorAll(".carta");
const btnBack = document.getElementById("back");
let puntos = document.getElementById("puntos");

start.addEventListener("click", () => {
  if (!juegoInciado) {
    audios("inicio", "play");
    iniciar(NIVEL, reloj, puntos);
    start.hidden = true;
    restart.hidden = false;
  }
});

restart.addEventListener("click", () => location.reload());

revisarJuego(baraja, NIVEL);

btnBack.addEventListener("click", () => {
  history.go(-1);
});
