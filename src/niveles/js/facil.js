const GANADOR = 'You Winn!!!';
const PERDEDOR = ' You lose, sorry';

let baraja = [];
let parUno = [];
let parDos = [];
let parTres = [];
let parCuatro = [];
let parCinco = [];
let parSeis = [];
let parSiete = [];
let parOcho = [];

let pares = [
    parUno,
    parDos,
    parTres,
    parCuatro,
    parCinco,
    parSeis,
    parSiete,
    parOcho
];

let imgs = [
    'poke1',
    'poke2',
    'poke3',
    'poke4',
    'poke5',
    'poke6',
    'poke7',
    'poke8'
];
const NIVEL = 16;
let parejas = [];
let jugada = [];
let PUNTOS = 0;
let CARTAS_ENCONTRADAS = 0;


const cartas = document.querySelectorAll('.cartas');

cartas.forEach(carta =>{
    carta.addEventListener('click', (e)=>{
        if(jugada.length < 2){
            darVueltaLaCarta(e.target.id);
            jugada.push(e.target.id);
            
        }
        if(jugada.length == 2){
            revisarJugada();
        }
    });
});

function revisarJugada(){
    let jugadaValida;
    
    pares.forEach(e =>{
        if(esJugadaValida(e)){
            jugadaValida = 1;
        }
    });

    if (jugadaValida === 1) {
        PUNTOS += 1;
        CARTAS_ENCONTRADAS += 1;
        jugada = [];
        return sumarPuntos();
    }else{
        jugadaNegativa(jugada);
    }
}

function jugadaNegativa(j){
    setTimeout(()=>{
        volverADarVueltaLaCarta(j[0]);
        volverADarVueltaLaCarta(j[1]);
        jugada = [];
    }, 1000);
}

function esJugadaValida(e){
    return e[0] === jugada[0] && e[1] === jugada[1] || 
           e[0] === jugada[1] && e[1] === jugada[0];
}

function darVueltaLaCarta(id){
    cargarImagenDeCarta(id);
}

function cargarImagenDeCarta(id){
    let carta = document.getElementById(id);
    let img = retornarImg(id);
    cambiarImagen(img, carta);
}
function cambiarImagen(opt, carta){
    switch (opt) {
        case 'poke1':
            carta.className = 'carta1';
            break;
            
        case 'poke2':
            carta.className = 'carta2';
            break;
        case 'poke3':
            carta.className = 'carta3';
            break;
        case 'poke4':
            carta.className = 'carta4';
            break;
        case 'poke5':
            carta.className = 'carta5';
            break;
        case 'poke6':
            carta.className = 'carta6';
            break;
        case 'poke7':
            carta.className = 'carta7';
            break;
        case 'poke8':
            carta.className = 'carta8';
            break;
        }
}

function retornarImg(id){
    let imagen;
    parejas.forEach(e=>{
        if(e.id === id){
            imagen = e.img; 
        }
    });
    return imagen;
}

function volverADarVueltaLaCarta(id){
    let carta = document.getElementById(id);
    carta.className = 'cartas';
}




iniciarJuego();


function iniciarJuego(){
    cargarCartas();
    establecerPokePares();
}

function cargarCartas(){
    
    cartas.forEach(carta =>{
    baraja.push(carta.id);  
    });

    while(sonPares()){
        cargarPares();
    }

    
}

function cargarPares(){
    if (parUno.length < 2) {
        cargarPar(parUno);

    }else if (parDos.length < 2) {
        cargarPar(parDos);

    }else if (parTres < 2) {
        cargarPar(parTres);

    }else if (parCuatro < 2) {
        cargarPar(parCuatro);

    }else if (parCinco < 2) {
        cargarPar(parCinco);

    }else if (parSeis < 2) {
        cargarPar(parSeis);

    }else if (parSiete < 2) {
        cargarPar(parSiete);

    }else if (parOcho < 2) {
        cargarPar(parOcho);

    }
}

function cargarPar(par){
    while (par.length < 2) {
        cargarUnoDelPar(par);
    }
}

function cargarUnoDelPar(par){
    let posicion = random(baraja.length, 1);
    if(!revisarPares(baraja[posicion])){
        par.push(baraja[posicion]);
    }
}

function random(nro, porSi = 0){
    let numero = Math.floor(Math.random()*nro);

    if(numero > nro - porSi){
        return 0;
    }else{
        return numero;
    }
}

function revisarPares(clave) {
    return revisarPar(parUno, clave)    || 
           revisarPar(parDos, clave)    || 
           revisarPar(parTres, clave)   || 
           revisarPar(parCuatro, clave) ||
           revisarPar(parCinco, clave)    || 
           revisarPar(parSeis, clave)    || 
           revisarPar(parSiete, clave)   || 
           revisarPar(parOcho, clave);
}

function sonPares(){
    return parUno.length < 2    || 
           parDos.length < 2    || 
           parTres.length < 2   || 
           parCuatro.length < 2 ||
           parCinco.length < 2    || 
           parSeis.length < 2    || 
           parSiete.length < 2   || 
           parOcho.length < 2; 
}

function revisarPar(par, clave) {
    return par.includes(clave);
}


function establecerPokePares(){
    while(!sonPokeCompleto()){
        establecerPokeEnPar();
    }
}

function establecerPokeEnPar(){
    let par = pares[random(8)];
    let imagen = imgs[random(8)];

    if(noSeEncuentraID(par[0], par[1]) && !revisarImagenEnParejas(imagen)){
        parejas.push({id: par[0], img: imagen});
        parejas.push({id: par[1], img: imagen});
    }
}

function noSeEncuentraID(id1, id2){
    return !revisarIdEnParejas(id1) && !revisarIdEnParejas(id2);
}

function revisarIdEnParejas(id){
    for(let i = 0; i < parejas.length -1; i++){
        if(parejas[i].id === id){
            return true;
        }
    }
}

function revisarImagenEnParejas(img){
    for(let i = 0; i < parejas.length -1; i++){
        if(parejas[i].img === img){
            return true;
        }
    }
}

function sonPokeCompleto(){
    return parejas.length == NIVEL;
}


function sumarPuntos(){
    let pantallaPuntos = document.getElementById('puntos');

    pantallaPuntos.innerText = PUNTOS;
}

/* Timer */
let time = document.getElementById('time');
let min = 0;
let seg = 60;

let timer = setInterval(()=>{
    if(seg != 0){
        seg--;
    }
    if(seg >= 10){
        time.innerText = `0${min}:${seg}`;
    }else{
        time.innerText = `0${min}:0${seg}`;
    }
    
    if(seg === 0){
        time.innerText = `TIME OUT`;
        alert(PERDEDOR);
    }

    winner(min, seg);
}, 1000);


function winner(min, seg){
    if(CARTAS_ENCONTRADAS == 8){
        clearTimeout(timer);
        alert(GANADOR);
    }
}
        






