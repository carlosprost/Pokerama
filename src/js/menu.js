/* Funcipon de atrás */
const btnBack = document.getElementById('back');

btnBack.addEventListener('click', ()=>{
    window.history.back();
});

/* variables */

const btnJuego = document.querySelectorAll('.btn-nivel');

btnJuego.forEach(btn =>{
    btn.addEventListener('click', (e)=>{
        elegirNivel(e.target.id);
    });
});

let elegirNivel = (nivel)=>{
    
    switch (nivel) {
        case 'easy':
            window.location.href = './niveles/easy.html';
            break;
        case 'medium':
            window.location.href = './niveles/medium.html';
            break;
        case 'hard':
            window.location.href = './niveles/hard.html';
            break;
    }
};