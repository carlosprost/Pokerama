/* index */
const btnIniciar = document.getElementById('iniciar');
const btnRanking = document.getElementById('ranking');


btnIniciar.addEventListener('click', ()=>{
    window.location.href = './src/menu.html';
});

btnRanking.addEventListener('click', ()=>{
    window.location.href = './src/ranking.html';
});