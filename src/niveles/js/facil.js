/* Importaciones necesarias */
import { 
    iniciar,
    revisarJuego, 
    juegoInciado, 
    audios
} from "./funciones.js";

/* Variables Golbales */
const cantImg = 18;
const NIVEL = 8;

const reloj = document.getElementById('reloj');
const start = document.getElementById('start');
const restart = document.getElementById('restart');
const baraja = document.querySelectorAll('.carta');
const btnBack = document.getElementById('back');
let puntos = document.getElementById('puntos');




start.addEventListener('click', ()=>{
    if(!juegoInciado){
        audios('inicio', 'play');
        iniciar(NIVEL, reloj, cantImg, baraja);
        start.hidden = true;
        restart.hidden = false;
    }else{
        start.hidden = false;
        restart.hidden = true;
    }
});

restart.addEventListener('click', ()=>{
    location.reload();
    if(!juegoInciado){
        audios('inicio', 'play');
        iniciar(NIVEL, reloj, cantImg, baraja);
        start.hidden = true;
        restart.hidden = false;
    }else{
        start.hidden = false;
        restart.hidden = true;
    }
});


revisarJuego(baraja, puntos);


btnBack.addEventListener('click', ()=>{
    history.go(-1);
});
