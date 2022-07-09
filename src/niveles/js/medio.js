/* Funcipon de atrás */
const btnBack = document.getElementById('back');

btnBack.addEventListener('click', ()=>{
    window.history.back();
});


const cartas = document.querySelectorAll('.cartas');
const GANADOR = 'You Winn!!!';
const PERDEDOR = ' You lose, sorry';
const time = document.getElementById('time');
let finDelJuego = false;

let baraja = [];
let parUno = [];
let parDos = [];
let parTres = [];
let parCuatro = [];
let parCinco = [];
let parSeis = [];
let parSiete = [];
let parOcho = [];
let parNueve = [];
let parDiez = [];
let parOnce = [];
let parDoce = [];



let pares = [
    parUno,
    parDos,
    parTres,
    parCuatro,
    parCinco,
    parSeis,
    parSiete,
    parOcho,
    parNueve,
    parDiez,
    parOnce,
    parDoce
];

let imgs = [
    'poke1',
    'poke2',
    'poke3',
    'poke4',
    'poke5',
    'poke6',
    'poke7',
    'poke8',
    'poke9',
    'poke10',
    'poke11',
    'poke12',
];
const NIVEL = 24;
let parejas = [];
let jugada = [];
let PUNTOS = 0;
let CARTAS_ENCONTRADAS = 0;


establecerGrid();

function establecerGrid(){
    let colum = 1;
    let row = 1;
    cartas.forEach(c =>{
        c.style.gridColumn = colum;
        c.style.gridRow= row;
        colum++;
        if(colum == 7){
            colum = 1;
            row++;
        }
    });
}




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
    carta.style.backgroundImage = `url("../assets/${opt}.png")`;
    carta.style.backgroundRepeat= 'no-repeat';
    carta.style.backgroundSize= 'cover';
    carta.style.backgroundPosition= 'center';
    carta.style.backgroundColor= 'antiquewhite';
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
    carta.style.backgroundImage= 'url("../assets/lomo_carta.jpg")';
    carta.style.backgroundRepeat= 'no-repeat';
    carta.style.backgroundSize= 'cover';
    carta.style.backgroundPosition= 'center';
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

    while(noSonPares()){
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

    }else if (parNueve < 2) {
        cargarPar(parNueve);

    }else if (parDiez < 2) {
        cargarPar(parDiez);

    }else if (parOnce < 2) {
        cargarPar(parOnce);

    }else if (parDoce < 2) {
        cargarPar(parDoce);

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
           revisarPar(parCinco, clave)  || 
           revisarPar(parSeis, clave)   || 
           revisarPar(parSiete, clave)  || 
           revisarPar(parOcho, clave)   ||
           revisarPar(parNueve, clave)  || 
           revisarPar(parDiez, clave)   || 
           revisarPar(parOnce, clave)   || 
           revisarPar(parDoce, clave);
}

function noSonPares(){
    return parUno.length < 2    || 
           parDos.length < 2    || 
           parTres.length < 2   || 
           parCuatro.length < 2 ||
           parCinco.length < 2  || 
           parSeis.length < 2   || 
           parSiete.length < 2  || 
           parOcho.length < 2   ||
           parNueve.length < 2  || 
           parDiez.length < 2   || 
           parOnce.length < 2   || 
           parDoce.length < 2; 
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
    let par = pares[random(NIVEL / 2)];
    let imagen = imgs[random(NIVEL / 2)];

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

let min = 2;
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

    if(min > 0 && seg === 0){
        min--;
        seg = 60;
    }

    winner();
    loose();
}, 1000);


function winner(){
    if(CARTAS_ENCONTRADAS == NIVEL / 2){
        finDelJuego = true;
        alert(GANADOR);
        clearTimeout(timer);
        
    }
}
function loose(){
    if(min === 0 && seg === 0){
        time.innerText = `00:00`;
        finDelJuego = true;
        alert(PERDEDOR);
        clearTimeout(timer);
        
    }
}

cartas.forEach(carta =>{
    carta.addEventListener('click', (e)=>{
        if(finDelJuego) return;
        if(e.target.id == jugada[0]) return;
        if(jugada.length < 2){
            darVueltaLaCarta(e.target.id);
            jugada.push(e.target.id);
            
        }
        if(jugada.length == 2){
            revisarJugada();
        }
    });
});

console.log(baraja);
console.log(parejas);
console.log(jugada);